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
  Alert,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell as RechartsCell,
} from 'recharts';
import { styled } from '@mui/material/styles';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import dashboardData from '../data/dashboardData.json';

// Tema DMFC: Verde gasolina
const dmfcTheme = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${dmfcTheme[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 8px 24px rgba(34, 197, 94, 0.15)`,
    transform: 'translateY(-2px)',
  },
}));

const DmfcPage = () => {
  const system = dashboardData.alternatives.find(alt => alt.id === 'dmfc');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Datos para gráficos
  const capexBreakdown = [
    { name: 'Generador', value: 10200, color: dmfcTheme[500] },
    { name: 'Almacenamiento', value: 1050, color: dmfcTheme[300] },
    { name: 'Instalación', value: 800, color: dmfcTheme[400] },
  ];

  const opexBreakdown = [
    { name: 'Combustible', value: 3780, color: dmfcTheme[600] },
    { name: 'Mantenimiento', value: 1200, color: dmfcTheme[500] },
    { name: 'Reemplazo', value: 5000, color: dmfcTheme[700] },
  ];

  const scalabilityData = [
    { escala: 'Piloto', unidades: 10, cartuchos: 210, viabilidad: 5 },
    { escala: 'Expansión', unidades: 100, cartuchos: 2100, viabilidad: 2 },
    { escala: 'Masivo', unidades: 1000, cartuchos: 21000, viabilidad: 0 },
  ];

  const autonomyData = [
    { name: 'Cartucho M10', value: 6.2, fill: dmfcTheme[300] },
    { name: 'Cartucho M28', value: 17.4, fill: dmfcTheme[500] },
  ];

  return (
    <Box sx={{ bgcolor: dmfcTheme[50], minHeight: '100vh', pt: 10, pb: 4 }}>
      <Container maxWidth={false} sx={{ p: 1.5 }}>
        {/* Header */}
        <Box sx={{ mb: 3, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: dmfcTheme[600], 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LocalGasStationIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: dmfcTheme[900], mb: 0.5 }}>
                {system.name}
              </Typography>
              <Chip label={system.context} sx={{ bgcolor: dmfcTheme[100], color: dmfcTheme[800], fontWeight: 600 }} />
            </Box>
          </Box>
          <Alert severity="warning" sx={{ mb: 2, bgcolor: dmfcTheme[50], border: `1px solid ${dmfcTheme[300]}` }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              No recomendado como fuente primaria
            </Typography>
            <Typography variant="body2">
              Esta tecnología es económicamente inviable como fuente primaria (24/7). Su aplicación correcta 
              es como sistema de respaldo híbrido (Solar + DMFC) para infraestructuras críticas, operando menos 
              del 5% del tiempo.
            </Typography>
          </Alert>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '800px' }}>
            Sistema de celda de combustible de metanol directo que garantiza disponibilidad energética del 100% 
            independiente de condiciones climáticas. Funciona como generador bajo demanda con autonomía limitada 
            por la capacidad del cartucho de combustible.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* KPIs principales */}
          <Grid item xs={12} md={6} lg={3}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], mb: 1.5, fontWeight: 600 }}>
                  CAPEX Total
                </Typography>
                <Typography variant="h3" sx={{ color: dmfcTheme[600], fontWeight: 700, mb: 0.5 }}>
                  ${system.costs.capex.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  LCOE: ${system.costs.lcoe}/kWh
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], mb: 1.5, fontWeight: 600 }}>
                  OPEX Anual
                </Typography>
                <Typography variant="h3" sx={{ color: dmfcTheme[600], fontWeight: 700, mb: 0.5 }}>
                  ${system.costs.opexAnnual.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Incluye combustible y reemplazo
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], mb: 1.5, fontWeight: 600 }}>
                  TCO (20 años)
                </Typography>
                <Typography variant="h3" sx={{ color: dmfcTheme[600], fontWeight: 700, mb: 0.5 }}>
                  ${system.costs.tco20Years.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Costo total de propiedad
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], mb: 1.5, fontWeight: 600 }}>
                  Vida Útil
                </Typography>
                <Typography variant="body2" sx={{ color: dmfcTheme[700], fontWeight: 600, mb: 0.5 }}>
                  {system.logistics.lifetime}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Como fuente primaria: &lt;1 año
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Desglose de CAPEX */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: dmfcTheme[900], fontWeight: 600 }}>
                  Desglose de CAPEX
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={capexBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dmfcTheme[200]} />
                    <XAxis dataKey="name" stroke={dmfcTheme[700]} tick={{ fontSize: 11 }} />
                    <YAxis stroke={dmfcTheme[700]} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {capexBreakdown.map((entry, index) => (
                        <RechartsCell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Desglose de OPEX */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: dmfcTheme[900], fontWeight: 600 }}>
                  Desglose de OPEX Anual
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={opexBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dmfcTheme[200]} />
                    <XAxis dataKey="name" stroke={dmfcTheme[700]} tick={{ fontSize: 11 }} />
                    <YAxis stroke={dmfcTheme[700]} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {opexBreakdown.map((entry, index) => (
                        <RechartsCell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Autonomía por Cartucho */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: dmfcTheme[900], fontWeight: 600 }}>
                  Autonomía por Cartucho
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={autonomyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value} días`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {autonomyData.map((entry, index) => (
                        <RechartsCell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2, p: 1.5, bgcolor: dmfcTheme[50], borderRadius: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Consumo: {system.design.fuelConsumption}
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Especificaciones Técnicas */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: dmfcTheme[900], fontWeight: 600 }}>
                  Especificaciones Técnicas
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700], width: '40%' }}>Generador</TableCell>
                        <TableCell>{system.design.generator}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Almacenamiento</TableCell>
                        <TableCell>{system.design.storage}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Capacidad</TableCell>
                        <TableCell>{system.design.capacity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Autonomía</TableCell>
                        <TableCell>{system.design.autonomy}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Consumo Combustible</TableCell>
                        <TableCell>{system.design.fuelConsumption}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Cartucho Recomendado</TableCell>
                        <TableCell>{system.design.fuelCartridge}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Ciclo de Trabajo</TableCell>
                        <TableCell>{system.performance.dutyCycle}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: dmfcTheme[700] }}>Respaldo Emergencia</TableCell>
                        <TableCell>{system.performance.emergencyBackup}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Mantenimiento y Logística */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: dmfcTheme[900], fontWeight: 600 }}>
                  Mantenimiento y Logística
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 1, 
                    bgcolor: dmfcTheme[50],
                    border: `1px solid ${dmfcTheme[200]}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocalGasStationIcon sx={{ color: dmfcTheme[600] }} />
                      <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], fontWeight: 600 }}>
                        Frecuencia de Reabastecimiento
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.frequency}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 1, 
                    bgcolor: dmfcTheme[50],
                    border: `1px solid ${dmfcTheme[200]}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <WarningIcon sx={{ color: dmfcTheme[600] }} />
                      <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], fontWeight: 600 }}>
                        Complejidad
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.maintenance}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 1, 
                    bgcolor: dmfcTheme[50],
                    border: `1px solid ${dmfcTheme[200]}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <InfoIcon sx={{ color: dmfcTheme[600] }} />
                      <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], fontWeight: 600 }}>
                        Dependencia
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.dependency}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: dmfcTheme[700], fontWeight: 600, mb: 1 }}>
                      Notas de Escalabilidad
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {system.logistics.scalabilityNotes}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Escalabilidad */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: dmfcTheme[900], fontWeight: 600 }}>
                  Impacto Logístico por Escala
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scalabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dmfcTheme[200]} />
                    <XAxis dataKey="escala" stroke={dmfcTheme[700]} />
                    <YAxis yAxisId="left" stroke={dmfcTheme[700]} label={{ value: 'Cartuchos/año', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke={dmfcTheme[700]} domain={[0, 5]} label={{ value: 'Viabilidad (0-5)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="cartuchos" fill={dmfcTheme[400]} radius={[4, 4, 0, 0]} name="Cartuchos M28/año" />
                  </BarChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2, p: 2, bgcolor: dmfcTheme[50], borderRadius: 1, border: `1px solid ${dmfcTheme[200]}` }}>
                  <Typography variant="caption" sx={{ color: dmfcTheme[800], fontWeight: 600, display: 'block', mb: 1 }}>
                    Recomendación Estratégica:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Usar exclusivamente como sistema de respaldo híbrido (Solar + DMFC) en infraestructuras críticas. 
                    Al operar menos del 5% del tiempo (&lt;500 horas/año vs 5,200 horas/año), el modelo se vuelve 
                    viable y extremadamente robusto para garantizar disponibilidad total incluso en eventos prolongados de baja radiación.
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DmfcPage;
