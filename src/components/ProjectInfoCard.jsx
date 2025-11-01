import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
}));

const InfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(135deg, #eaefff 0%, #d8e1ff 100%)',
  border: `1px solid ${theme.palette.primary[300]}`,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary[400],
  },
}));

const ProjectInfoCard = ({ projectInfo }) => {
  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.900',
              mb: 1,
            }}
          >
            {projectInfo.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cliente: <strong>{projectInfo.client}</strong>
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              textAlign: 'center',
              color: 'primary.700',
              mb: 3,
            }}
          >
            Perfil de Carga
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={5}>
              <InfoBox>
                <PowerIcon 
                  sx={{ 
                    fontSize: 40,
                    color: 'primary.700',
                    mb: 2,
                    mx: 'auto',
                    display: 'block',
                  }} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary',
                    display: 'block',
                    mb: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {projectInfo.loadProfile.power.label}
                </Typography>
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.900',
                  }}
                >
                  {projectInfo.loadProfile.power.value}{' '}
                  <Typography 
                    component="span" 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {projectInfo.loadProfile.power.unit}
                  </Typography>
                </Typography>
              </InfoBox>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <InfoBox>
                <EnergySavingsLeafIcon 
                  sx={{ 
                    fontSize: 40,
                    color: 'primary.700',
                    mb: 2,
                    mx: 'auto',
                    display: 'block',
                  }} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary',
                    display: 'block',
                    mb: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {projectInfo.loadProfile.energy.label}
                </Typography>
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.900',
                  }}
                >
                  {projectInfo.loadProfile.energy.value}{' '}
                  <Typography 
                    component="span" 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {projectInfo.loadProfile.energy.unit}
                  </Typography>
                </Typography>
              </InfoBox>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProjectInfoCard;
