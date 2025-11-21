import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dashboardData from '../data/dashboardData.json';

// Tema Solar: Amarillo
const solarTheme = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${solarTheme[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 8px 24px rgba(245, 158, 11, 0.15)`,
    transform: 'translateY(-2px)',
  },
}));

const SolarPage = () => {
  const system = dashboardData.alternatives.find(alt => alt.id === 'solar');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Datos para gráficos
  const capexBreakdown = [
    { name: 'Generación', value: 264, color: solarTheme[400] },
    { name: 'Almacenamiento', value: 3150, color: solarTheme[500] },
    { name: 'Electrónica', value: 560, color: solarTheme[300] },
    { name: 'Instalación', value: 950, color: solarTheme[600] },
  ];

  const scalabilityData = [
    { escala: 'Piloto', unidades: 10, superficie: 80, baterias: 30 },
    { escala: 'Expansión', unidades: 100, superficie: 800, baterias: 300 },
    { escala: 'Masivo', unidades: 1000, superficie: 8000, baterias: 3000 },
  ];

  const performanceMetrics = [
    { metric: 'Disponibilidad Operativa', value: '99.77%', icon: <CheckCircleIcon /> },
    { metric: 'Probabilidad de Pérdida de Carga', value: '0.23%', icon: <TrendingUpIcon /> },
    { metric: 'Horas Sol Pico (Bogotá)', value: '4.5 HSP', icon: <WbSunnyIcon /> },
    { metric: 'Autonomía', value: '72 horas', icon: <BatteryChargingFullIcon /> },
  ];

  return (
    <Box sx={{ bgcolor: solarTheme[50], minHeight: '100vh', pt: 10, pb: 4 }}>
      <Container maxWidth={false} sx={{ p: 1.5 }}>
        {/* Header */}
        <Box sx={{ mb: 3, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: solarTheme[400], 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <WbSunnyIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: solarTheme[900], mb: 0.5 }}>
                {system.name}
              </Typography>
              <Chip label={system.context} sx={{ bgcolor: solarTheme[100], color: solarTheme[800], fontWeight: 600 }} />
            </Box>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '100%' }}>
            Sistema fotovoltaico robusto diseñado para garantizar una disponibilidad operativa superior al 99.7% 
            en las condiciones climáticas de Bogotá, con sobredimensionamiento estratégico para manejar la variabilidad 
            climática característica de la región Andina.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 1.5,
            mb: 2,
          }}
        >
          {/* Métricas de Rendimiento */}
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: solarTheme[700], mb: 1.5, fontWeight: 600 }}>
                Disponibilidad
              </Typography>
              <Typography variant="h3" sx={{ color: solarTheme[600], fontWeight: 700, mb: 0.5 }}>
                99.77%
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Probabilidad de Pérdida de Carga: 0.23%
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: solarTheme[700], mb: 1.5, fontWeight: 600 }}>
                CAPEX Total
              </Typography>
              <Typography variant="h3" sx={{ color: solarTheme[600], fontWeight: 700, mb: 0.5 }}>
                ${system.costs.capex.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                LCOE: ${system.costs.lcoe}/kWh
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: solarTheme[700], mb: 1.5, fontWeight: 600 }}>
                OPEX Anual
              </Typography>
              <Typography variant="h3" sx={{ color: solarTheme[600], fontWeight: 700, mb: 0.5 }}>
                ${system.costs.opexAnnual}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Mantenimiento mínimo
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: solarTheme[700], mb: 1.5, fontWeight: 600 }}>
                TCO (20 años)
              </Typography>
              <Typography variant="h3" sx={{ color: solarTheme[600], fontWeight: 700, mb: 0.5 }}>
                ${system.costs.tco20Years.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Costo total de propiedad
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '1fr 1fr',
            },
            gap: 1.5,
            mb: 2,
          }}
        >
          {/* Desglose de CAPEX */}
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: solarTheme[900], fontWeight: 600 }}>
                Desglose de CAPEX
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={capexBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke={solarTheme[200]} />
                  <XAxis dataKey="name" stroke={solarTheme[700]} tick={{ fontSize: 11 }} />
                  <YAxis stroke={solarTheme[700]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {capexBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>

          {/* Especificaciones Técnicas */}
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: solarTheme[900], fontWeight: 600 }}>
                Especificaciones Técnicas
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: solarTheme[700] }}>Generador</TableCell>
                      <TableCell>{system.design.generator}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: solarTheme[700] }}>Almacenamiento</TableCell>
                      <TableCell>{system.design.storage}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: solarTheme[700] }}>Capacidad</TableCell>
                      <TableCell>{system.design.capacity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: solarTheme[700] }}>Autonomía</TableCell>
                      <TableCell>{system.design.autonomy}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: solarTheme[700] }}>Inclinación</TableCell>
                      <TableCell>10°-15° con orientación Sur</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: solarTheme[700] }}>Huella</TableCell>
                      <TableCell>{system.logistics.footprint}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Box>

        {/* Escalabilidad */}
        <Box sx={{ mb: 2 }}>
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: solarTheme[900], fontWeight: 600 }}>
                Análisis de Escalabilidad
              </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scalabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={solarTheme[200]} />
                    <XAxis dataKey="escala" stroke={solarTheme[700]} />
                    <YAxis yAxisId="left" stroke={solarTheme[700]} />
                    <YAxis yAxisId="right" orientation="right" stroke={solarTheme[700]} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="superficie" stroke={solarTheme[400]} strokeWidth={3} name="Superficie (m²)" />
                    <Line yAxisId="right" type="monotone" dataKey="baterias" stroke={solarTheme[600]} strokeWidth={3} name="Baterías" />
                  </LineChart>
                </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '1fr 1fr',
            },
            gap: 1.5,
          }}
        >
          {/* Mantenimiento y Logística */}
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: solarTheme[900], fontWeight: 600 }}>
                Mantenimiento y Logística
              </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: solarTheme[700], fontWeight: 600 }}>
                      Frecuencia de Mantenimiento
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.frequency}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: solarTheme[700], fontWeight: 600 }}>
                      Complejidad
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.maintenance}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: solarTheme[700], fontWeight: 600 }}>
                      Dependencia
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.dependency}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: solarTheme[700], fontWeight: 600 }}>
                      Notas de Escalabilidad
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.scalabilityNotes}
                    </Typography>
                  </Box>
                </Box>
            </CardContent>
          </StyledCard>

          {/* Rendimiento */}
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: solarTheme[900], fontWeight: 600 }}>
                Métricas de Rendimiento
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 1.5,
                }}
              >
                  {performanceMetrics.map((metric, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 1, 
                        bgcolor: solarTheme[50],
                        border: `1px solid ${solarTheme[200]}`,
                      }}
                    >
                      <Box sx={{ color: solarTheme[600], mb: 0.5 }}>
                        {metric.icon}
                      </Box>
                      <Typography variant="caption" sx={{ color: solarTheme[700], display: 'block', mb: 0.5, fontWeight: 600 }}>
                        {metric.metric}
                      </Typography>
                      <Typography variant="h6" sx={{ color: solarTheme[900], fontWeight: 700 }}>
                        {metric.value}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      </Container>
    </Box>
  );
};

export default SolarPage;
