import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MyNavbar from '../component/MyNavbar';
import { useTranslation } from 'react-i18next';

function AtmDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [atm, setAtm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const apiUrl = `https://localhost:44355/api/Atm/GetById/${id}`;

  useEffect(() => {
    const fetchAtm = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAtm(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ATM data:', error);
        setLoading(false);
      }
    };

    fetchAtm();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:44355/api/Atm/Delete/${id}`);
      navigate('/Home');
    } catch (error) {
      console.error('Error deleting ATM data:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/AtmUpdate/${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Typography variant="h4" gutterBottom>
            Atm {t('Details')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('Name')}:</Typography>
              <Typography>{atm.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('Address')}:</Typography>
              <Typography>{atm.adress}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('City Name')}:</Typography>
              <Typography>{atm.cityName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('District Name')}:</Typography>
              <Typography>{atm.districtName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('Latitude')}:</Typography>
              <Typography>{atm.latitude}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('Longitude')}:</Typography>
              <Typography>{atm.longitude}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('Active Status')}:</Typography>
              <Typography>{atm.isActive ? 'Active' : 'Inactive'}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                {t('Update')}
              </Button>
              <Box ml={2}>
                <Button variant="contained" color="error" onClick={handleClickOpen}>
                  {t('Delete')}
                </Button>
              </Box>
            </Grid>
        </Paper>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete ATM?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this ATM?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AtmDetail;
