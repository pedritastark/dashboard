import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  transition: 'all 0.3s ease',
  minHeight: '120px',
  opacity: 0,
  transform: 'translateX(-20px)',
  '&.loaded': {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary[400],
  },
}));

const HighlightedCard = styled(StyledCard)(({ theme }) => ({
  background: 'linear-gradient(135deg, #eaefff 0%, #d8e1ff 100%)',
  border: `2px solid ${theme.palette.primary[500]}`,
}));

const KpiCard = ({ title, value, unit, system, icon: Icon, highlight = false, delay = 0, isLoaded = false }) => {
  const CardComponent = highlight ? HighlightedCard : StyledCard;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, delay]);
  
  return (
    <CardComponent elevation={0} className={animated ? 'loaded' : ''}>
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.7rem' }}>
            {title}
          </Typography>
          {Icon && (
            <Icon 
              sx={{ 
                fontSize: 20, 
                color: 'primary.600',
                opacity: 0.8,
              }} 
            />
          )}
        </Box>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            color: 'primary.900',
            mb: 1,
            letterSpacing: '-0.02em',
            fontSize: '1.25rem',
          }}
        >
          {value}
          {unit && (
            <Typography 
              component="span" 
              variant="body2" 
              sx={{ 
                ml: 0.5, 
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              {unit}
            </Typography>
          )}
        </Typography>
        {system && (
          <Chip 
            label={system} 
            size="small" 
            sx={{ 
              mt: 0.5,
              bgcolor: 'primary.100',
              color: 'primary.900',
              fontWeight: 500,
              border: '1px solid',
              borderColor: 'primary.300',
              fontSize: '0.65rem',
              height: 20,
            }}
          />
        )}
      </CardContent>
    </CardComponent>
  );
};

export default KpiCard;
