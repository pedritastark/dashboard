import React from 'react';
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

// Obtener color por sistema, con fallback a azul
const getSystemColor = (systemName) => {
  return SYSTEM_COLORS[systemName] || {
    primary: '#2a11e4',
    light: '#eaefff',
    medium: '#646dff',
    dark: '#231a95',
    fill: '#2a11e4',
    stroke: '#231a95',
  };
};

const MatrizDecision = ({ decisionMatrix }) => {
  const { categories, scores } = decisionMatrix;

  // Preparar datos para el gráfico de radar
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
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
          Comparación de sistemas según múltiples criterios (escala 1-5, con pesos ponderados)
        </Typography>
        
        {/* Gráfico de Radar */}
        <Box sx={{ width: '100%', height: 500, mb: 4 }}>
          <ResponsiveContainer>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#d8e1ff" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="categoria" 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 5]} 
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              {sistemas.map((sistema) => (
                <Radar
                  key={sistema.sistema}
                  name={sistema.sistema}
                  dataKey={sistema.sistema}
                  stroke={sistema.stroke}
                  fill={sistema.fill}
                  fillOpacity={sistema.fillOpacity}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: sistema.stroke }}
                />
              ))}
              <Legend 
                wrapperStyle={{ paddingTop: 20 }}
                iconType="circle"
              />
            </RadarChart>
          </ResponsiveContainer>
        </Box>

        {/* Tabla de Scores y Pesos */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, color: 'primary.900' }}>
            Puntuaciones por Categoría
          </Typography>
          <TableContainer 
            component={Paper} 
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.200',
              overflow: 'hidden',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #2a11e4 0%, #371fff 100%)' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>
                    Categoría
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>
                    Peso
                  </TableCell>
                  {sistemas.map(sistema => {
                    const colors = getSystemColor(sistema.sistema);
                    return (
                      <TableCell 
                        key={sistema.sistema} 
                        align="center" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#ffffff',
                          fontSize: '0.875rem',
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
                            '& .MuiChip-label': {
                              px: 1.5,
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
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                      {cat.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: 'primary.700' }}>
                      <Chip
                        label={`${(cat.weight * 100).toFixed(0)}%`}
                        size="small"
                        sx={{
                          bgcolor: 'primary.100',
                          color: 'primary.900',
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: 'primary.300',
                          minWidth: '50px',
                        }}
                      />
                    </TableCell>
                    {scores.map((score) => {
                      const colors = getSystemColor(score.system);
                      const value = score.values[index];
                      return (
                        <TableCell key={score.system} align="center">
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              bgcolor: colors.light,
                              color: colors.dark,
                              fontWeight: 600,
                              fontSize: '0.875rem',
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
                  <TableCell component="th" scope="row" sx={{ color: 'primary.900', fontSize: '0.875rem' }}>
                    Puntuación Total Ponderada
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label="100%"
                      size="small"
                      sx={{
                        bgcolor: 'primary.200',
                        color: 'primary.900',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: 'primary.400',
                      }}
                    />
                  </TableCell>
                  {sistemas.map((sistema) => {
                    const colors = getSystemColor(sistema.sistema);
                    return (
                      <TableCell 
                        key={sistema.sistema} 
                        align="center" 
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: colors.light,
                            color: colors.dark,
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            border: `2px solid ${colors.medium}`,
                            minWidth: '70px',
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
      </CardContent>
    </StyledCard>
  );
};

export default MatrizDecision;
