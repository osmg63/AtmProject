import React, { useState, useEffect } from 'react';
import { TableContainer,Typography, TablePagination, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Box, TableSortLabel, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import MyNavbar from '../component/MyNavbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTranslation } from 'react-i18next';

function MyFilter() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const field = queryParams.get('field') || 'name';
  const operator = queryParams.get('operator') || 'contains';
  const value = queryParams.get('value') || '';
  const sortField = queryParams.get('sortField') || 'name';
  const sortDir = queryParams.get('sortDir') || 'asc';
  const page = parseInt(queryParams.get('page')) || 0;
  const limit = parseInt(queryParams.get('limit')) || 8;

  const { t, i18n } = useTranslation();
  const [atmList, setAtmList] = useState([]);
  const [atmData, setAtmData] = useState({});
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState({
    offset: page,
    limit: limit,
    sort: [{ field: sortField, dir: sortDir }],
    filter: {
      field: field,
      operator: operator,
      value: value,
      logic: 'and',
      filters: []
    }
  });
  const [filterField, setFilterField] = useState(field);
  const [filterOperator, setFilterOperator] = useState(operator);
  const [filterValue, setFilterValue] = useState(value);
  const [showFilter, setShowFilter] = useState(true); 

  const apiUrl = "https://localhost:44355/api/Atm/Pagination";

  useEffect(() => {
    const fetchAtms = async () => {
      try {
        const response = await axios.post(apiUrl, request);
        setAtmList(response.data.items);
        setAtmData(response.data);
        setLoading(false);
        console.log(response)
      } catch (error) {
        console.error('Error fetching ATM data:', error);
        setLoading(false);
      }
    };

    fetchAtms();
  }, [request]);

  const updateUrlParams = (newRequest) => {
    const params = new URLSearchParams();
    if (newRequest.filter.field) params.set('field', newRequest.filter.field);
    if (newRequest.filter.operator) params.set('operator', newRequest.filter.operator);
    if (newRequest.filter.value) params.set('value', newRequest.filter.value);
    if (newRequest.sort[0].field) params.set('sortField', newRequest.sort[0].field);
    if (newRequest.sort[0].dir) params.set('sortDir', newRequest.sort[0].dir);
    params.set('page', newRequest.offset);
    params.set('limit', newRequest.limit);

    navigate(`?${params.toString()}`);
  };

  const handleChangePage = (event, newPage) => {
    setRequest(prevRequest => {
      const updatedRequest = {
        ...prevRequest,
        offset: newPage
      };
      updateUrlParams(updatedRequest);
      return updatedRequest;
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRequest(prevRequest => {
      const updatedRequest = {
        ...prevRequest,
        limit: newRowsPerPage,
        offset: 0
      };
      updateUrlParams(updatedRequest);
      return updatedRequest;
    });
  };

  const handleSort = (field) => {
    setRequest(prevRequest => {
      const isAsc = prevRequest.sort[0]?.field === field && prevRequest.sort[0]?.dir === 'asc';
      const updatedRequest = {
        ...prevRequest,
        sort: [{ field: field, dir: isAsc ? 'desc' : 'asc' }]
      };
      updateUrlParams(updatedRequest);
      return updatedRequest;
    });
  };

  const handleFilterChange = () => {
    setRequest(prevRequest => {
      const updatedRequest = {
        ...prevRequest,
        filter: {
          field: filterField,
          operator: filterOperator,
          value: filterValue,
          logic: 'and',
          filters: []
        }
      };
      updateUrlParams(updatedRequest);
      return updatedRequest;
    });
  };

  const createData = (id, name, adress, isActive, cityName, districtName) => {
    return { id, name, adress, isActive, cityName, districtName };
  };

  const rows = atmList.map(atm => (
    createData(atm.id, atm.name, atm.adress, atm.isActive, atm.cityName, atm.districtName)
  ));
 

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="container" component={Paper}>
      <MyNavbar />
      <Box className="filter-box" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
         
          {showFilter && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,margin:2, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box >
                <FormControl variant="outlined" sx={{ minWidth: 120,marginRight:2 }}>
                  <InputLabel>{t('Field')}</InputLabel>
                  <Select
                    value={filterField}
                    onChange={(e) => setFilterField(e.target.value)}
                    label={t('Field')}
                  >
                    <MenuItem value="name">{t('name')}</MenuItem>
                    <MenuItem value="adress">{t('address')}</MenuItem>
                    <MenuItem value="cityName">{t('cityName')}</MenuItem>
                    <MenuItem value="districtName">{t('districtName')}</MenuItem>
                    <MenuItem value="isActive">{t('activeStatus')}</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel>{t('Operator')}</InputLabel>
                  <Select
                    value={filterOperator}
                    onChange={(e) => setFilterOperator(e.target.value)}
                    label={t('Operator')}
                  >
                  <MenuItem value="contains">{t('contains')}</MenuItem>
                    <MenuItem value="neq">{t('notEquals')}</MenuItem>
                    <MenuItem value="equals">{t('equals')}</MenuItem>
                    <MenuItem value="startsWith">{t('startsWith')}</MenuItem>
                    <MenuItem value="endsWith">{t('endsWith')}</MenuItem>
                  </Select>
                </FormControl>
                </Box>
              <TextField
                label={t('value')}
                variant="outlined"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
                <Button variant="contained" color="primary" onClick={handleFilterChange} sx={{ marginRight: 2 }}>
                  <Typography variant="caption">
                    {t('APPLY FILTERS')}
                  </Typography>
                </Button>

            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          color='info'
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? t('HIDE FILTERS') : t('filter')}
        </Button>
      </Box>

      <TableContainer component={Paper} className="table-container" sx={{ marginTop: 0 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={request.sort[0]?.field === 'name'}
                  direction={request.sort[0]?.field === 'name' ? request.sort[0]?.dir : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  {t('Name')}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={request.sort[0]?.field === 'adress'}
                  direction={request.sort[0]?.field === 'adress' ? request.sort[0]?.dir : 'asc'}
                  onClick={() => handleSort('adress')}
                >
                  {t('Address')}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={request.sort[0]?.field === 'cityName'}
                  direction={request.sort[0]?.field === 'cityName' ? request.sort[0]?.dir : 'asc'}
                  onClick={() => handleSort('cityName')}
                >
                  {t('City Name')}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={request.sort[0]?.field === 'districtName'}
                  direction={request.sort[0]?.field === 'districtName' ? request.sort[0]?.dir : 'asc'}
                  onClick={() => handleSort('districtName')}
                >
                  {t('District Name')}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={request.sort[0]?.field === 'isActive'}
                  direction={request.sort[0]?.field === 'isActive' ? request.sort[0]?.dir : 'asc'}
                  onClick={() => handleSort('isActive')}
                >
                  {t('Active Status')}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">{t('Detail')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.adress}</TableCell>
                <TableCell align="right">{row.cityName}</TableCell>
                <TableCell align="right">{row.districtName}</TableCell>
                <TableCell align="right">
                  {row.isActive ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                </TableCell>
                <TableCell align="right">
                  <Link to={`/AtmDetail/${row.id}`} style={{ textDecoration: 'none' }}>
                    <AdsClickIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[1, 2, 3, 5, 8, 10]}
        count={atmData.totalCount || 0}
        rowsPerPage={request.limit}
        page={request.offset}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: 2 }}
        labelRowsPerPage={t('Rows per page')}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('more than')} ${to}`}`}
      />
    </Box>
  );
}

export default MyFilter;
