import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, TextField, Button, CircularProgress, MenuItem } from '@mui/material';
import MyNavbar from '../component/MyNavbar';
import { useTranslation } from 'react-i18next';
function CreateAtm() {
  const [atm, setAtm] = useState({
    name: '',
    adress: '',
    cityId: '',
    districtId: '',
    latitude: '',
    longitude: '',
    isActive: true,
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  const apiUrl = 'https://localhost:44355/api/Atm/Create';
  const citiesApiUrl = 'https://localhost:44355/api/City/GetAll';
  const districtsApiUrl = (cityId) => `https://localhost:44355/api/City/GetByCityIdDistrict/${cityId}`;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(citiesApiUrl);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (atm.cityId) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(districtsApiUrl(atm.cityId));
          setDistricts(response.data);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };

      fetchDistricts();
    }
  }, [atm.cityId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAtm({
      ...atm,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const createResponse = await axios.post(apiUrl, atm);
      navigate(`/AtmDetail/${createResponse.data.id}`);
      console.log(createResponse);
    } catch (error) {
      console.error('Error creating ATM data:', error);
    } 
  };

  return (
    <div>
    <MyNavbar />
    <Box p={3}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('Create Atm' )} 
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('Name')}
                name="name"
                value={atm.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('Address')}
                name="adress"
                value={atm.adress}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={t('City Name')}
                name="cityId"
                value={atm.cityId}
                onChange={handleChange}
                required
              >
                {cities.map((city) => (
                  <MenuItem  key={city.id} value={city.id} >
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={t("District Name")}
                name="districtId"
                value={atm.districtId}
                onChange={handleChange}
                required
                disabled={!atm.cityId}
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id} sx={{ fontSize: '0.875rem' }}>
                    {district.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("Latitude")}
                name="latitude"
                value={atm.latitude}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t("Longitude")}
                name="longitude"
                value={atm.longitude}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={t("Active Status")}
                name="isActive"
                value={atm.isActive}
                onChange={handleChange}
                required
              >
                <MenuItem value={true}>{t('Active')}</MenuItem>
                <MenuItem value={false}>{t('InActive')}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  {loading ? <CircularProgress size={24} /> : t('Create')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  </div>
  );
}

export default CreateAtm;
