import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  ThemeProvider, 
  createTheme,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import CostosChart from './components/CostosChart';
import LcoeChart from './components/LcoeChart';
import DisenoTable from './components/DisenoTable';
import MatrizDecision from './components/MatrizDecision';
import ProjectInfoCard from './components/ProjectInfoCard';
import dashboardData from './data/dashboardData.json';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      50: '#eaefff',
      100: '#d8e1ff',
      200: '#bac7ff',
      300: '#90a1ff',
      400: '#646dff',
      500: '#4340ff',
      600: '#371fff',
      700: '#2a11e4',
      800: '#2514bf',
      900: '#231a95',
      950: '#170f57',
      main: '#2a11e4',
      light: '#646dff',
      dark: '#231a95',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(42, 17, 228, 0.05)',
    '0 1px 3px 0 rgba(42, 17, 228, 0.1)',
    '0 4px 6px -1px rgba(42, 17, 228, 0.1)',
    '0 10px 15px -3px rgba(42, 17, 228, 0.1)',
    '0 20px 25px -5px rgba(42, 17, 228, 0.1)',
    ...Array(19).fill('0 20px 25px -5px rgba(42, 17, 228, 0.1)'),
  ],
});

function App() {
  const { projectInfo, kpis, alternatives, decisionMatrix, strategicRecommendations } = dashboardData;
  const [isLoaded, setIsLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Trigger animations on mount
    setIsLoaded(true);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1300,
          width: 'calc(100% - 32px)',
          maxWidth: '1400px',
        }}
      >
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: 'rgba(42, 17, 228, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(42, 17, 228, 0.3)',
          }}
        >
          <Toolbar sx={{ py: 0.75, px: 2 }}>
            <BoltIcon sx={{ mr: 1.5, fontSize: 22 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '0.9rem' }}>
              {projectInfo.title}
            </Typography>
            <Button
              id="systems-button"
              aria-controls={open ? 'systems-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                mr: 2,
                borderRadius: '20px',
                px: 2,
                py: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Sistemas
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
                  minWidth: 150,
                  boxShadow: '0 8px 32px 0 rgba(42, 17, 228, 0.2)',
                },
              }}
            >
              <MenuItem onClick={handleClose}>Solar</MenuItem>
              <MenuItem onClick={handleClose}>Eólico</MenuItem>
              <MenuItem onClick={handleClose}>DMFC</MenuItem>
            </Menu>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
              {projectInfo.client}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Box 
        sx={{ 
          bgcolor: 'background.default',
          minHeight: '100vh',
          pt: 10, // Space for fixed AppBar
          pb: 4,
        }}
      >
        <Container 
          maxWidth={false}
          sx={{
            p: 1.5,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                lg: '450px 1fr 1fr',
              },
              gridTemplateRows: {
                xs: 'auto',
                lg: 'auto auto auto',
              },
              gap: 1.5,
              gridTemplateAreas: {
                xs: `
                  "project"
                  "costos"
                  "lcoe"
                  "matrix"
                  "table"
                  "recommendation"
                `,
                lg: `
                  "project costos lcoe"
                  "matrix matrix matrix"
                  "table table recommendation"
                `,
              },
            }}
          >
            {/* Project Info - Perfil de Carga - Top Left */}
            <Box
              sx={{
                gridArea: 'project',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <ProjectInfoCard projectInfo={projectInfo} />
            </Box>

            {/* Costos Chart - Top Middle */}
            <Box
              sx={{
                gridArea: 'costos',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
              }}
            >
              <CostosChart alternatives={alternatives} isLoaded={isLoaded} delay={0.8} />
            </Box>

            {/* LCOE Chart - Top Right */}
            <Box
              sx={{
                gridArea: 'lcoe',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
              }}
            >
              <LcoeChart alternatives={alternatives} isLoaded={isLoaded} delay={1} />
            </Box>

            {/* Matriz de Decisión Section - Central */}
            <Box
              sx={{
                gridArea: 'matrix',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
                transition: 'opacity 2s ease-out 1.2s, transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s',
              }}
            >
              <MatrizDecision decisionMatrix={decisionMatrix} isLoaded={isLoaded} />
            </Box>

            {/* Table Section - Bottom Left */}
            <Box
              sx={{
                gridArea: 'table',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s',
              }}
            >
              <DisenoTable alternatives={alternatives} />
            </Box>

            {/* Primary Recommendation with Recommendations - Bottom Right */}
            <Box
              sx={{
                gridArea: 'recommendation',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'primary.50',
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: 'primary.300',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 28, color: 'primary.700' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 0.5, fontSize: '0.7rem' }}>
                      Recomendación Principal
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900', fontSize: '0.875rem' }}>
                      {kpis.primaryRecommendation}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.900', mb: 1.5, display: 'block', fontSize: '0.7rem' }}>
                    Recomendaciones Estratégicas
                  </Typography>
                  {strategicRecommendations.map((rec, index) => {
                    // Procesar el contenido de recommendation primero
                    const processedContent = rec.recommendation
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>');
                    
                    return (
                      <Typography 
                        key={rec.id}
                        variant="caption" 
                        component="div"
                        sx={{ 
                          color: 'text.primary',
                          lineHeight: 1.7,
                          fontSize: '0.75rem',
                          mb: 1.5,
                          display: 'block',
                          '& strong': { 
                            fontWeight: 600, 
                            color: 'primary.900' 
                          },
                          '& em': { 
                            fontStyle: 'italic',
                            color: 'primary.700',
                          },
                          '&:last-child': { mb: 0 },
                        }}
                        dangerouslySetInnerHTML={{
                          __html: `<strong>${rec.title}:</strong> ${processedContent}`
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
