import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Images/Almabetter.png';

const drawerWidth = 240;

const buttonStyle = {
  fontWeight: 'bold',
  fontSize: '16px',
  textTransform: 'capitalize',
  '&:hover': { color: 'blue' },
};

const activeButtonStyle = {
  ...buttonStyle,
  color: 'blue', // Active link color
};

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation(); // Get the current location

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, display: { xs: 'block', sm: 'none' } }}>
        <Link to='/'>
          <img src={logo} alt='almabetter-logo' height={'40px'} />
        </Link>
      </Typography>
      <Divider />
      <List>
        {['/', '/myresumes', '/about'].map((path, index) => (
          <ListItem key={path} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={path} style={{ textDecoration: 'none', width: '100%' }}>
                <Button sx={location.pathname === path ? activeButtonStyle : buttonStyle}>
                  {index === 0 ? 'Resume Templates' : index === 1 ? 'My Resumes' : 'About Us'}
                </Button>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position='fixed' color='default'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open navigation drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none', xs: 'block' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link to='/'>
              <img src={logo} alt='almabetter-logo' height={'40px'} style={{ cursor: 'pointer' }} />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {['/', '/myresumes', '/about'].map((path, index) => (
              <Link key={path} to={path} style={{ textDecoration: 'none' }}>
                <Button sx={location.pathname === path ? activeButtonStyle : buttonStyle}>
                  {index === 0 ? 'Resume Templates' : index === 1 ? 'My Resumes' : 'About Us'}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor='left'
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
