import React, { useState, useEffect } from 'react';
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
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  transform: 'translateY(100px) scaleY(0.3)',
  transition: 'opacity 2s ease-out, transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&.loaded': {
    opacity: 1,
    transform: 'translateY(0) scaleY(1)',
  },
}));

// Usar colores de la paleta azul
const COLORS = ['#2a11e4', '#371fff', '#646dff'];

const LcoeChart = ({ alternatives, isLoaded = false, delay = 0 }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, delay]);

  // Preparar datos para el gráfico de LCOE
  const chartData = alternatives
    .map(alt => ({
      name: alt.name.split(' ').pop() || alt.name,
      lcoe: alt.costs.lcoe,
      fullName: alt.name,
    }))
    .sort((a, b) => a.lcoe - b.lcoe); // Ordenar por LCOE

  return (
    <StyledCard elevation={0} className={animated ? 'loaded' : ''}>
      <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.900', fontSize: '0.875rem' }}>
          LCOE (Levelized Cost of Energy)
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500, fontSize: '0.7rem' }}>
          Costo nivelado de energía en $/kWh
        </Typography>
        <Box sx={{ width: '100%', height: '100%', minHeight: 280, flex: 1 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 5,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e1ff" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                label={{ value: 'LCOE ($/kWh)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                width={60}
              />
              <Tooltip
                formatter={(value) => `$${value.toFixed(2)}`}
                labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #bac7ff',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar 
                dataKey="lcoe" 
                name="LCOE" 
                radius={[4, 4, 0, 0]}
                animationBegin={animated ? (delay * 1000 + 500) : 0}
                animationDuration={2500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
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
