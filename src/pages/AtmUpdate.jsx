import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, TextField, Button, CircularProgress, MenuItem } from '@mui/material';
import MyNavbar from '../component/MyNavbar';
import { useTranslation } from 'react-i18next';
function AtmUpdate() {
  const { id } = useParams();
  const [atm, setAtm] = useState({
    name: '',
    adress: '',
    cityId: '',
    districtId: '',
    latitude: '',
    longitude: '',
    isActive: true,
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {t}=useTranslation();
  const navigate = useNavigate();

  const atmApiUrl = `https://localhost:44355/api/Atm/GetById/${id}`;
  const citiesApiUrl = 'https://localhost:44355/api/City/GetAll';
  const districtsApiUrl = (cityId) => `https://localhost:44355/api/City/GetByCityIdDistrict/${cityId}`;

  useEffect(() => {
    const fetchAtm = async () => {
      try {
        const response = await axios.get(atmApiUrl);
        setAtm(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ATM data:', error);
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get(citiesApiUrl);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchAtm();
    fetchCities();
  }, [id]);

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
    try {
      const updateResponse = await axios.put(`https://localhost:44355/api/Atm/update/`, atm);
      navigate(`/AtmDetail/${id}`);
      console.log(updateResponse);
    } catch (error) {
      console.error('Error updating ATM data:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <MyNavbar />
      <Box p={3}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            {t('Update Atm')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("Name")}
                  name="name"
                  value={atm.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("Address")}
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
                  label={t("City Name")}
                  name="cityId"
                  value={atm.cityId}
                  onChange={handleChange}
                  required
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id} sx={{ fontSize: '0.875rem' }}>
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
                    {t('Update')}
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

export default AtmUpdate;
