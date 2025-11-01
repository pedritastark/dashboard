import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  ThemeProvider, 
  createTheme,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import BoltIcon from '@mui/icons-material/Bolt';

import KpiCard from './components/KpiCard';
import CostosChart from './components/CostosChart';
import LcoeChart from './components/LcoeChart';
import DisenoTable from './components/DisenoTable';
import MatrizDecision from './components/MatrizDecision';
import ProjectInfoCard from './components/ProjectInfoCard';
import RecommendationsCard from './components/RecommendationsCard';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #2a11e4 0%, #371fff 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <BoltIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '-0.01em' }}>
            {projectInfo.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {projectInfo.client}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="xl">
          {/* Project Info Section */}
          <Box sx={{ mb: 5 }}>
            <ProjectInfoCard projectInfo={projectInfo} />
          </Box>

          {/* KPIs Section */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                Indicadores Clave
              </Typography>
            </Box>
            
            {/* Recomendación Principal - Centrada y destacada */}
            <Box
              sx={{
                p: 3.5,
                mb: 4,
                bgcolor: 'primary.50',
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'primary.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2.5,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 36, color: 'primary.700' }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, fontWeight: 500 }}>
                  Recomendación Principal
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.900' }}>
                  {kpis.primaryRecommendation}
                </Typography>
              </Box>
            </Box>

            {/* KPIs en grid balanceado */}
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} lg={4}>
                <KpiCard
                  title="LCOE Más Efectivo"
                  value={kpis.mostCostEffectiveLcoe.value}
                  unit={kpis.mostCostEffectiveLcoe.unit}
                  system={kpis.mostCostEffectiveLcoe.system}
                  icon={TrendingDownIcon}
                  highlight={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <KpiCard
                  title="Alternativa Viable"
                  value={kpis.viableAlternativeLcoe.value}
                  unit={kpis.viableAlternativeLcoe.unit}
                  system={kpis.viableAlternativeLcoe.system}
                  icon={CheckCircleIcon}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <KpiCard
                  title="No Recomendado"
                  value={kpis.notRecommendedLcoe.value}
                  unit={kpis.notRecommendedLcoe.unit}
                  system={kpis.notRecommendedLcoe.system}
                  icon={WarningIcon}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Charts Section */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                Análisis de Costos
              </Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6} lg={6}>
                <CostosChart alternatives={alternatives} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LcoeChart alternatives={alternatives} />
              </Grid>
            </Grid>
          </Box>

          {/* Table Section */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                Especificaciones Técnicas
              </Typography>
            </Box>
            <DisenoTable alternatives={alternatives} />
          </Box>

          {/* Matriz de Decisión Section */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                Matriz de Decisión
              </Typography>
            </Box>
            <MatrizDecision decisionMatrix={decisionMatrix} />
          </Box>

          {/* Recommendations Section */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                Recomendaciones Estratégicas
              </Typography>
            </Box>
            <RecommendationsCard recommendations={strategicRecommendations} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
