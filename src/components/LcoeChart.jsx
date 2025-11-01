import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
}));

// Usar colores de la paleta azul
const COLORS = ['#2a11e4', '#371fff', '#646dff'];

const LcoeChart = ({ alternatives }) => {
  // Preparar datos para el gráfico de LCOE
  const chartData = alternatives
    .map(alt => ({
      name: alt.name.split(' ').pop() || alt.name,
      lcoe: alt.costs.lcoe,
      fullName: alt.name,
    }))
    .sort((a, b) => a.lcoe - b.lcoe); // Ordenar por LCOE

  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1, color: 'primary.900' }}>
          LCOE (Levelized Cost of Energy)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
          Costo nivelado de energía en $/kWh
        </Typography>
        <Box sx={{ width: '100%', height: 420, minHeight: 420 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e1ff" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis 
                label={{ value: 'LCOE ($/kWh)', angle: -90, position: 'insideLeft' }}
                stroke="#64748b"
              />
              <Tooltip
                formatter={(value) => `$${value.toFixed(2)}`}
                labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #bac7ff',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="lcoe" name="LCOE" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default LcoeChart;
