import React, { useState, useEffect } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import MyNavbar from '../component/MyNavbar';
import '../css/home.css'; // CSS dosyasını import etmeyi unutmayın
import { Link } from 'react-router-dom';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTranslation } from 'react-i18next';

function Home() {
  const [atmList, setAtmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const apiUrl = "https://localhost:44355/api/Atm/GetAll";

  useEffect(() => {
    const fetchAtms = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAtmList(response.data); 
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ATM data:', error);
      }
    };

    fetchAtms();
  }, []);

  const createData = (id, name, adress, isActive, cityName, districtName) => {
    return { id, name, adress, isActive, cityName, districtName };
  }

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
    <div className="container">
      <MyNavbar />
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
             <TableRow>
              <TableCell>{t('table.name')}</TableCell>
              <TableCell align="right">{t('table.address')}</TableCell>
              <TableCell align="right">{t('table.cityName')}</TableCell>
              <TableCell align="right">{t('table.districtName')}</TableCell>
              <TableCell align="right">{t('table.activeStatus')}</TableCell>
              <TableCell align="right">{t('table.detail')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
    </div>
  );
}

export default Home;
