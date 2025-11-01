import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
}));

const CostosChart = ({ alternatives }) => {
  // Preparar datos para el gráfico de barras agrupadas
  const chartData = alternatives.map(alt => ({
    name: alt.name.split(' ').pop() || alt.name,
    CAPEX: alt.costs.capex,
    'OPEX Anual': alt.costs.opexAnnual,
    fullName: alt.name,
  }));

  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3, color: 'primary.900' }}>
          Comparación de Costos: CAPEX vs OPEX Anual
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
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e1ff" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #bac7ff',
                  borderRadius: '8px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="CAPEX" fill="#2a11e4" name="CAPEX ($)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="OPEX Anual" fill="#646dff" name="OPEX Anual ($)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CostosChart;
