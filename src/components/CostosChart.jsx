import React, { useState, useEffect } from 'react';
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

const CostosChart = ({ alternatives, isLoaded = false, delay = 0 }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, delay]);

  // Preparar datos para el gráfico de barras agrupadas
  const chartData = alternatives.map(alt => ({
    name: alt.name.split(' ').pop() || alt.name,
    CAPEX: alt.costs.capex,
    'OPEX Anual': alt.costs.opexAnnual,
    fullName: alt.name,
  }));

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
        <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 1.5, color: 'primary.900', fontSize: '0.875rem' }}>
          Comparación de Costos: CAPEX vs OPEX Anual
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
                formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: 10, fontSize: '11px' }}
                iconSize={12}
              />
              <Bar 
                dataKey="CAPEX" 
                fill="#475569" 
                name="CAPEX ($)" 
                radius={[4, 4, 0, 0]}
                isAnimationActive={animated}
                animationBegin={animated ? (delay * 1000) : 0}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="OPEX Anual" 
                fill="#64748b" 
                name="OPEX Anual ($)" 
                radius={[4, 4, 0, 0]}
                isAnimationActive={animated}
                animationBegin={animated ? (delay * 1000 + 200) : 0}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CostosChart;
