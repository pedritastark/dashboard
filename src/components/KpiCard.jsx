import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  transition: 'all 0.3s ease',
  minHeight: '160px',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary[400],
  },
}));

const HighlightedCard = styled(StyledCard)(({ theme }) => ({
  background: 'linear-gradient(135deg, #eaefff 0%, #d8e1ff 100%)',
  border: `2px solid ${theme.palette.primary[500]}`,
}));

const KpiCard = ({ title, value, unit, system, icon: Icon, highlight = false }) => {
  const CardComponent = highlight ? HighlightedCard : StyledCard;
  
  return (
    <CardComponent elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {Icon && (
            <Icon 
              sx={{ 
                fontSize: 28, 
                color: 'primary.600',
                opacity: 0.8,
              }} 
            />
          )}
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            color: 'primary.900',
            mb: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
          {unit && (
            <Typography 
              component="span" 
              variant="body1" 
              sx={{ 
                ml: 1, 
                color: 'text.secondary',
                fontWeight: 500,
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
              mt: 1,
              bgcolor: 'primary.100',
              color: 'primary.900',
              fontWeight: 500,
              border: '1px solid',
              borderColor: 'primary.300',
            }}
          />
        )}
      </CardContent>
    </CardComponent>
  );
};

export default KpiCard;
