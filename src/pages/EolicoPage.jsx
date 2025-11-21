import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
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
import AirIcon from '@mui/icons-material/Air';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WarningIcon from '@mui/icons-material/Warning';
import dashboardData from '../data/dashboardData.json';

// Tema Eólico: Azul cielo
const eolicoTheme = {
  50: '#e0f2fe',
  100: '#bae6fd',
  200: '#7dd3fc',
  300: '#38bdf8',
  400: '#0ea5e9',
  500: '#0284c7',
  600: '#0369a1',
  700: '#075985',
  800: '#0c4a6e',
  900: '#082f49',
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${eolicoTheme[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 8px 24px rgba(2, 132, 199, 0.15)`,
    transform: 'translateY(-2px)',
  },
}));

const EolicoPage = () => {
  const system = dashboardData.alternatives.find(alt => alt.id === 'eolico');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Datos para gráficos
  const capexBreakdown = [
    { name: 'Generación', value: 1300, color: eolicoTheme[400] },
    { name: 'Almacenamiento', value: 3150, color: eolicoTheme[500] },
    { name: 'Electrónica', value: 350, color: eolicoTheme[300] },
    { name: 'Instalación/Obra', value: 1400, color: eolicoTheme[600] },
  ];

  const powerOutputData = [
    { velocidad: '4-5 m/s', potencia: 60, label: 'Marginal' },
    { velocidad: '8 m/s', potencia: 210, label: 'Promedio' },
    { velocidad: '11-12 m/s', potencia: 600, label: 'Nominal' },
  ];

  const scalabilityData = [
    { escala: 'Piloto', unidades: 10, viabilidad: 5 },
    { escala: 'Expansión', unidades: 100, viabilidad: 3 },
    { escala: 'Masivo', unidades: 1000, viabilidad: 1 },
  ];

  return (
    <Box sx={{ bgcolor: eolicoTheme[50], minHeight: '100vh', pt: 10, pb: 4 }}>
      <Container maxWidth={false} sx={{ p: 1.5 }}>
        {/* Header */}
        <Box sx={{ mb: 3, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: eolicoTheme[500], 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <AirIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: eolicoTheme[900], mb: 0.5 }}>
                {system.name}
              </Typography>
              <Chip label={system.context} sx={{ bgcolor: eolicoTheme[100], color: eolicoTheme[800], fontWeight: 600 }} />
            </Box>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '100%' }}>
            Sistema de micro-generación eólica diseñado para aprovechar el recurso eólico excepcional 
            de Clase 7 en la Alta Guajira. Requiere infraestructura especializada y mantenimiento 
            mecánico regular debido a sus componentes móviles.
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
          {/* KPIs principales */}
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], mb: 1.5, fontWeight: 600 }}>
                CAPEX Total
              </Typography>
              <Typography variant="h3" sx={{ color: eolicoTheme[600], fontWeight: 700, mb: 0.5 }}>
                ${system.costs.capex.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                LCOE: ${system.costs.lcoe}/kWh
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], mb: 1.5, fontWeight: 600 }}>
                OPEX Anual
              </Typography>
              <Typography variant="h3" sx={{ color: eolicoTheme[600], fontWeight: 700, mb: 0.5 }}>
                ${system.costs.opexAnnual}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Mantenimiento mecánico
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], mb: 1.5, fontWeight: 600 }}>
                TCO (20 años)
              </Typography>
              <Typography variant="h3" sx={{ color: eolicoTheme[600], fontWeight: 700, mb: 0.5 }}>
                ${system.costs.tco20Years.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Costo total de propiedad
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], mb: 1.5, fontWeight: 600 }}>
                Vida Útil
              </Typography>
              <Typography variant="h3" sx={{ color: eolicoTheme[600], fontWeight: 700, mb: 0.5 }}>
                {system.logistics.lifetime}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Ambiente salino
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
                <Typography variant="h6" sx={{ mb: 2, color: eolicoTheme[900], fontWeight: 600 }}>
                  Desglose de CAPEX
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={capexBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke={eolicoTheme[200]} />
                    <XAxis dataKey="name" stroke={eolicoTheme[700]} tick={{ fontSize: 11 }} />
                    <YAxis stroke={eolicoTheme[700]} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {capexBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </StyledCard>

          {/* Curva de Potencia */}
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: eolicoTheme[900], fontWeight: 600 }}>
                  Curva de Potencia vs Velocidad del Viento
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={powerOutputData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={eolicoTheme[200]} />
                    <XAxis dataKey="label" stroke={eolicoTheme[700]} />
                    <YAxis stroke={eolicoTheme[700]} label={{ value: 'Potencia (W)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="potencia" stroke={eolicoTheme[500]} strokeWidth={3} dot={{ fill: eolicoTheme[500] }} />
                  </LineChart>
                </ResponsiveContainer>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                  La potencia varía con el cubo de la velocidad del viento (P ∝ v³)
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
          {/* Especificaciones Técnicas */}
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: eolicoTheme[900], fontWeight: 600 }}>
                  Especificaciones Técnicas
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700], width: '40%' }}>Generador</TableCell>
                        <TableCell>{system.design.generator}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700] }}>Clase de Viento</TableCell>
                        <TableCell>{system.design.windClass}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700] }}>Velocidad Media</TableCell>
                        <TableCell>{system.design.windSpeed}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700] }}>Potencia Real (8 m/s)</TableCell>
                        <TableCell>{system.performance.powerOutput}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700] }}>Torre</TableCell>
                        <TableCell>{system.performance.tower}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700] }}>Almacenamiento</TableCell>
                        <TableCell>{system.design.storage}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: eolicoTheme[700] }}>Autonomía</TableCell>
                        <TableCell>{system.design.autonomy}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
            </CardContent>
          </StyledCard>

          {/* Mantenimiento y Logística */}
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: eolicoTheme[900], fontWeight: 600 }}>
                  Mantenimiento y Logística
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 1, 
                    bgcolor: eolicoTheme[50],
                    border: `1px solid ${eolicoTheme[200]}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <EngineeringIcon sx={{ color: eolicoTheme[600] }} />
                      <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], fontWeight: 600 }}>
                        Frecuencia de Mantenimiento
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.frequency}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 1, 
                    bgcolor: eolicoTheme[50],
                    border: `1px solid ${eolicoTheme[200]}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <WarningIcon sx={{ color: eolicoTheme[600] }} />
                      <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], fontWeight: 600 }}>
                        Complejidad
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.maintenance}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: eolicoTheme[700], fontWeight: 600, mb: 1 }}>
                      Notas de Escalabilidad
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.scalabilityNotes}
                    </Typography>
                  </Box>
                </Box>
            </CardContent>
          </StyledCard>
        </Box>

        {/* Escalabilidad */}
        <Box sx={{ mb: 2 }}>
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: eolicoTheme[900], fontWeight: 600 }}>
                Viabilidad por Escala de Despliegue
              </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scalabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={eolicoTheme[200]} />
                    <XAxis dataKey="escala" stroke={eolicoTheme[700]} />
                    <YAxis yAxisId="left" stroke={eolicoTheme[700]} label={{ value: 'Unidades', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke={eolicoTheme[700]} domain={[0, 5]} label={{ value: 'Viabilidad (1-5)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="unidades" fill={eolicoTheme[400]} radius={[4, 4, 0, 0]} name="Unidades" />
                    <Line yAxisId="right" type="monotone" dataKey="viabilidad" stroke={eolicoTheme[700]} strokeWidth={3} name="Viabilidad" />
                  </BarChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2, p: 2, bgcolor: eolicoTheme[50], borderRadius: 1, border: `1px solid ${eolicoTheme[200]}` }}>
                  <Typography variant="caption" sx={{ color: eolicoTheme[800], fontWeight: 600, display: 'block', mb: 1 }}>
                    Recomendación para Despliegues Masivos:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Instalar micro-redes con turbinas de mayor potencia (5-10 kW) para energizar grupos de 20-50 cámaras, 
                    reduciendo los puntos de mantenimiento de 1,000 a solo 20-50 máquinas más robustas.
                  </Typography>
                </Box>
            </CardContent>
          </StyledCard>
        </Box>
      </Container>
    </Box>
  );
};

export default EolicoPage;
