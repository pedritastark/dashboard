import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SolarPage from './pages/SolarPage';
import EolicoPage from './pages/EolicoPage';
import DmfcPage from './pages/DmfcPage';
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
  const { projectInfo } = dashboardData;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar projectInfo={projectInfo} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solar" element={<SolarPage />} />
          <Route path="/eolico" element={<EolicoPage />} />
          <Route path="/dmfc" element={<DmfcPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
