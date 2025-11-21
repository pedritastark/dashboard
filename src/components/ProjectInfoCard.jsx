import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
}));

const InfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  border: `1px solid ${theme.palette.primary[300]}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary[400],
  },
}));

const ProjectInfoCard = ({ projectInfo }) => {
  return (
    <StyledCard elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="subtitle1" 
          component="h2"
          sx={{ 
            fontWeight: 600, 
            color: 'primary.900',
            mb: 1.5,
            fontSize: '0.875rem',
          }}
        >
          Perfil de Carga
        </Typography>
        <Grid container spacing={1} direction="column" sx={{ flex: 1, height: '100%' }}>
          <Grid item xs={12} sx={{ flex: 1, display: 'flex' }}>
            <InfoBox sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, minHeight: 'calc(50% - 4px)', position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <PowerIcon 
                  sx={{ 
                    fontSize: 56,
                    color: 'primary.700',
                  }} 
                />
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.2,
                        mb: 0.25,
                      }}
                    >
                      Demanda de
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.2,
                      }}
                    >
                      Potencia Continua
                    </Typography>
                  </Box>
                </Box>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.900',
                    fontSize: '1.5rem',
                  }}
                >
                  {projectInfo.loadProfile.power.value}{' '}
                  <Typography 
                    component="span" 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  >
                    {projectInfo.loadProfile.power.unit}
                  </Typography>
                </Typography>
              </Box>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sx={{ flex: 1, display: 'flex' }}>
            <InfoBox sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, minHeight: 'calc(50% - 4px)', position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <EnergySavingsLeafIcon 
                  sx={{ 
                    fontSize: 56,
                    color: 'primary.700',
                  }} 
                />
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.2,
                        mb: 0.25,
                      }}
                    >
                      Demanda de
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.2,
                      }}
                    >
                      Energía Diaria
                    </Typography>
                  </Box>
                </Box>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.900',
                    fontSize: '1.5rem',
                  }}
                >
                  {projectInfo.loadProfile.energy.value}{' '}
                  <Typography 
                    component="span" 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  >
                    {projectInfo.loadProfile.energy.unit}
                  </Typography>
                </Typography>
              </Box>
            </InfoBox>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default ProjectInfoCard;
