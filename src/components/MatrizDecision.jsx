import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// Paleta de colores distintiva para cada sistema
const SYSTEM_COLORS = {
  'Solar FV': {
    primary: '#10b981', // Verde éxito
    light: '#d1fae5',
    medium: '#34d399',
    dark: '#059669',
    fill: '#10b981',
    stroke: '#059669',
  },
  'Eólico': {
    primary: '#3b82f6', // Azul estándar
    light: '#dbeafe',
    medium: '#60a5fa',
    dark: '#2563eb',
    fill: '#3b82f6',
    stroke: '#2563eb',
  },
  'DMFC': {
    primary: '#f59e0b', // Ámbar/Naranja
    light: '#fef3c7',
    medium: '#fbbf24',
    dark: '#d97706',
    fill: '#f59e0b',
    stroke: '#d97706',
  },
};

// Obtener color por sistema, con fallback a gris slate
const getSystemColor = (systemName) => {
  return SYSTEM_COLORS[systemName] || {
    primary: '#475569',
    light: '#f1f5f9',
    medium: '#64748b',
    dark: '#334155',
    fill: '#475569',
    stroke: '#334155',
  };
};

const MatrizDecision = ({ decisionMatrix, isLoaded = false }) => {
  const { categories, scores } = decisionMatrix;
  const [radarAnimated, setRadarAnimated] = useState(false);
  const [tableAnimated, setTableAnimated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const radarTimer = setTimeout(() => {
        setRadarAnimated(true);
      }, 1500);
      const tableTimer = setTimeout(() => {
        setTableAnimated(true);
      }, 2000);
      return () => {
        clearTimeout(radarTimer);
        clearTimeout(tableTimer);
      };
    }
  }, [isLoaded]);

  // Preparar datos para el gráfico de radar
  // Para la animación desde el centro, los datos finales se usan directamente
  // Recharts animará desde 0 automáticamente si usamos isAnimationActive
  const radarData = categories.map((cat, index) => {
    const punto = { categoria: cat.name };
    scores.forEach(score => {
      punto[score.system] = score.values[index];
    });
    return punto;
  });

  const sistemas = scores.map((score) => {
    const colors = getSystemColor(score.system);
    return {
      sistema: score.system,
      ...colors,
      fillOpacity: 0.3,
      strokeOpacity: 1,
      totalScore: score.totalScore,
    };
  });

  return (
    <StyledCard elevation={0} sx={{ height: { xs: 'auto', lg: '100%' }, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, fontWeight: 500, fontSize: '0.7rem' }}>
          Comparación de sistemas según múltiples criterios (escala 1-5, con pesos ponderados)
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' }, 
          gap: 2, 
          flex: 1, 
          overflow: 'hidden',
          alignItems: { xs: 'center', lg: 'stretch' },
        }}>
          {/* Gráfico de Radar - Izquierda */}
          <Box 
            sx={{ 
              flex: 1,
              minWidth: 0,
              height: { xs: 300, lg: 'auto' },
              minHeight: { xs: 300, lg: 400 },
              width: { xs: '100%', lg: 'auto' },
              opacity: radarAnimated ? 1 : 0,
              transform: radarAnimated ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 2s ease-out, transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#d8e1ff" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="categoria" 
                  tick={{ fill: '#64748b', fontSize: { xs: 8, sm: 10 }, fontWeight: 500 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 5]} 
                  tick={{ fill: '#64748b', fontSize: { xs: 8, sm: 9 } }}
                  tickCount={6}
                />
                {sistemas.map((sistema, index) => (
                  <Radar
                    key={sistema.sistema}
                    name={sistema.sistema}
                    dataKey={sistema.sistema}
                    stroke={sistema.stroke}
                    fill={sistema.fill}
                    fillOpacity={sistema.fillOpacity}
                    strokeWidth={2}
                    dot={{ r: 3, fill: sistema.stroke }}
                    isAnimationActive={radarAnimated}
                    animationBegin={radarAnimated ? (index * 100) : 0}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                ))}
                <Legend 
                  wrapperStyle={{ paddingTop: 10, fontSize: { xs: '9px', sm: '10px' } }}
                  iconType="circle"
                  iconSize={8}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          {/* Tabla de Scores y Pesos - Derecha */}
          <Box 
            sx={{ 
              flex: 1,
              minWidth: 0,
              width: { xs: '100%', lg: 'auto' },
              opacity: tableAnimated ? 1 : 0,
              transform: tableAnimated ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
              display: 'flex',
              flexDirection: 'column',
              overflow: { xs: 'visible', lg: 'hidden' },
            }}
          >
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1.5, color: 'primary.900', fontSize: '0.75rem' }}>
              Puntuaciones por Categoría
            </Typography>
            <TableContainer 
              component={Paper} 
              variant="outlined"
              sx={{ 
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'primary.200',
                overflowX: { xs: 'auto', lg: 'auto' },
                overflowY: 'auto',
                flex: 1,
                maxWidth: '100%',
                width: '100%',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': {
                  height: 8,
                  width: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 4,
                },
              }}
            >
            <Table 
              size="small" 
              stickyHeader
              sx={{
                minWidth: { xs: 500, sm: 600, lg: 'auto' },
                width: '100%',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                    color: '#ffffff !important',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    py: 1,
                    borderBottom: 'none',
                  }}>
                    Categoría
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                    color: '#ffffff !important',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    py: 1,
                    borderBottom: 'none',
                  }}>
                    Peso
                  </TableCell>
                  {sistemas.map(sistema => {
                    const colors = getSystemColor(sistema.sistema);
                    return (
                      <TableCell 
                        key={sistema.sistema} 
                        align="center" 
                        sx={{ 
                          background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                          color: '#ffffff !important',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          py: 1,
                          borderBottom: 'none',
                        }}
                      >
                        <Chip
                          label={sistema.sistema}
                          size="small"
                          sx={{
                            bgcolor: colors.light,
                            color: colors.dark,
                            fontWeight: 600,
                            border: `1px solid ${colors.medium}`,
                            fontSize: '0.65rem',
                            height: 20,
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat, index) => (
                  <TableRow 
                    key={cat.name}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: 'primary.50' },
                      '&:hover': { backgroundColor: 'primary.100', transition: 'background-color 0.2s' },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500, fontSize: '0.7rem', py: 1 }}>
                      {cat.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: 'primary.700', fontSize: '0.7rem', py: 1 }}>
                      <Chip
                        label={`${(cat.weight * 100).toFixed(0)}%`}
                        size="small"
                        sx={{
                          bgcolor: 'primary.100',
                          color: 'primary.900',
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: 'primary.300',
                          minWidth: '40px',
                          fontSize: '0.65rem',
                          height: 20,
                        }}
                      />
                    </TableCell>
                    {scores.map((score) => {
                      const colors = getSystemColor(score.system);
                      const value = score.values[index];
                      return (
                        <TableCell key={score.system} align="center" sx={{ py: 1 }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              bgcolor: colors.light,
                              color: colors.dark,
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              border: `2px solid ${colors.medium}`,
                            }}
                          >
                            {value}
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                <TableRow 
                  sx={{ 
                    background: 'linear-gradient(135deg, #eaefff 0%, #d8e1ff 100%)',
                    '& td': { fontWeight: 600 },
                    borderTop: '2px solid',
                    borderColor: 'primary.300',
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ color: 'primary.900', fontSize: '0.7rem', py: 1 }}>
                    Puntuación Total Ponderada
                  </TableCell>
                  <TableCell align="center" sx={{ py: 1 }}>
                    <Chip
                      label="100%"
                      size="small"
                      sx={{
                        bgcolor: 'primary.200',
                        color: 'primary.900',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: 'primary.400',
                        fontSize: '0.65rem',
                        height: 20,
                      }}
                    />
                  </TableCell>
                  {sistemas.map((sistema) => {
                    const colors = getSystemColor(sistema.sistema);
                    return (
                      <TableCell 
                        key={sistema.sistema} 
                        align="center"
                        sx={{ py: 1 }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5,
                            bgcolor: colors.light,
                            color: colors.dark,
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            border: `2px solid ${colors.medium}`,
                            minWidth: '60px',
                          }}
                        >
                          {sistema.totalScore.toFixed(2)}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
            </TableContainer>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MatrizDecision;
