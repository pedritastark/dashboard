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

// Usar colores de la paleta gris slate
const COLORS = ['#475569', '#64748b', '#334155'];

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
    <StyledCard 
      elevation={0} 
      className={animated ? 'loaded' : ''}
      sx={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0) scaleY(1)' : 'translateY(100px) scaleY(0.3)',
        transition: 'opacity 2s ease-out, transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.900', fontSize: '0.875rem' }}>
          LCOE (Levelized Cost of Energy)
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500, fontSize: '0.7rem' }}>
          Costo nivelado de energía en $/kWh
        </Typography>
        <Box sx={{ width: '100%', height: { xs: 250, sm: 280 } }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 5,
                left: -10,
                bottom: 5,
              }}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fontSize: 10 }}
                width={35}
              />
              <Tooltip
                formatter={(value) => `$${value.toFixed(2)}`}
                labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar 
                dataKey="lcoe" 
                name="LCOE" 
                radius={[4, 4, 0, 0]}
                isAnimationActive={animated}
                animationBegin={animated ? (delay * 1000) : 0}
                animationDuration={1500}
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
