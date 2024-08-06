import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

function MyNavbar() {
  const { t, i18n } = useTranslation();
  const [anchorNav, setAnchorNav] = useState(null);
  const [anchorLang, setAnchorLang] = useState(null);

  const openMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  const openLangMenu = (event) => {
    setAnchorLang(event.currentTarget);
  };

  const closeLangMenu = () => {
    setAnchorLang(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    closeLangMenu();
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'none', md: 'flex' } }}>
          <AddLocationAltIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {t('ŞekerBank ATM')}
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button component={Link} to="/" color='inherit'>{t('Home')}</Button>
          <Button component={Link} to="/ViewMap" color='inherit'>{t('Map')}</Button>
          <Button component={Link} to="/CreateAtm" color='inherit'>{t('Create Atm')}</Button>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorNav}
            open={Boolean(anchorNav)}
            onClose={closeMenu}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuItem component={Link} to="/" onClick={closeMenu}>{t('Home')}</MenuItem>
            <MenuItem component={Link} to="/ViewMap" onClick={closeMenu}>{t('Map')}</MenuItem>
            <MenuItem component={Link} to="/CreateAtm" onClick={closeMenu}>{t('Create Atm')}</MenuItem>
          </Menu>
        </Box>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'flex', md: 'none' } }}>
          <AddLocationAltIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {t('ŞekerBank ATM')}
        </Typography>
        <IconButton size='large' color='inherit' onClick={openLangMenu}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorLang}
          open={Boolean(anchorLang)}
          onClose={closeLangMenu}
        >
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('tr')}>Türkçe</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default MyNavbar;
