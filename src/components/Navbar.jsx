import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({ projectInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  // Definir colores según la ruta actual
  const getNavbarTheme = () => {
    const path = location.pathname;
    if (path === '/') {
      // Home - Gris Slate
      return {
        background: 'rgba(71, 85, 105, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(71, 85, 105, 0.3)',
      };
    } else if (path === '/solar') {
      // Solar - Amarillo
      return {
        background: 'rgba(245, 158, 11, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(245, 158, 11, 0.3)',
      };
    } else if (path === '/eolico') {
      // Eólico - Azul Cielo
      return {
        background: 'rgba(14, 165, 233, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(14, 165, 233, 0.3)',
      };
    } else if (path === '/dmfc') {
      // DMFC - Verde Gasolina
      return {
        background: 'rgba(34, 197, 94, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.3)',
      };
    } else {
      // Fallback - Negro
      return {
        background: 'rgba(0, 0, 0, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      };
    }
  };

  const isHome = location.pathname === '/';
  const navbarTheme = getNavbarTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 8, sm: 16 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1300,
        width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 32px)' },
        maxWidth: '1400px',
      }}
    >
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: navbarTheme.background,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: { xs: '30px', sm: '50px' },
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: navbarTheme.boxShadow,
        }}
      >
        <Toolbar sx={{ 
          py: { xs: 0.5, sm: 0.75 }, 
          px: { xs: 1.5, sm: 2 },
          minHeight: { xs: '48px !important', sm: '56px !important' },
        }}>
          <BoltIcon sx={{ 
            mr: { xs: 1, sm: 1.5 }, 
            fontSize: { xs: 18, sm: 22 } 
          }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600, 
              letterSpacing: '-0.01em', 
              fontSize: { xs: '0.75rem', sm: '0.9rem' },
              cursor: 'pointer',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleNavigation('/')}
          >
            {projectInfo.title}
          </Typography>
          
          {!isHome && (
            <Button
              onClick={() => handleNavigation('/')}
              startIcon={<HomeIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                fontWeight: 500,
                mr: { xs: 1, sm: 2 },
                borderRadius: '20px',
                px: { xs: 1, sm: 2 },
                py: { xs: 0.25, sm: 0.5 },
                minWidth: { xs: 'auto', sm: '64px' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Inicio
              </Box>
            </Button>
          )}
          
          <Button
            id="systems-button"
            aria-controls={open ? 'systems-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              fontWeight: 500,
              mr: { xs: 1, sm: 2 },
              borderRadius: '20px',
              px: { xs: 1, sm: 2 },
              py: { xs: 0.25, sm: 0.5 },
              minWidth: { xs: 'auto', sm: '80px' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Sistemas
            </Box>
          </Button>
          
          <Menu
            id="systems-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'systems-button',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: { xs: 150, sm: 180 },
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <MenuItem onClick={() => handleNavigation('/solar')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                Sistema Solar FV
              </Box>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/eolico')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#0ea5e9' }} />
                Sistema Eólico
              </Box>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/dmfc')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
                Sistema DMFC
              </Box>
            </MenuItem>
          </Menu>
          
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.9, 
              fontSize: { xs: '0.65rem', sm: '0.75rem' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {projectInfo.client}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
