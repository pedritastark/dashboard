import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
} from '@mui/material';
import CostosChart from '../components/CostosChart';
import LcoeChart from '../components/LcoeChart';
import DisenoTable from '../components/DisenoTable';
import MatrizDecision from '../components/MatrizDecision';
import ProjectInfoCard from '../components/ProjectInfoCard';
import dashboardData from '../data/dashboardData.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Home = () => {
  const { projectInfo, kpis, alternatives, decisionMatrix, strategicRecommendations } = dashboardData;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default',
        minHeight: '100vh',
        pt: { xs: 8, sm: 10 },
        pb: { xs: 2, sm: 4 },
        px: { xs: 0, sm: 0 },
        overflowX: 'hidden',
      }}
    >
      <Container 
        maxWidth={false}
        sx={{
          p: { xs: 1, sm: 1.5 },
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(300px, 450px) 1fr 1fr',
            },
            gridTemplateRows: {
              xs: 'auto auto auto auto auto auto',
              lg: 'auto auto auto',
            },
            gap: { xs: 1, sm: 1.5 },
            gridTemplateAreas: {
              xs: `
                "project"
                "costos"
                "lcoe"
                "matrix"
                "table"
                "recommendation"
              `,
              lg: `
                "project costos lcoe"
                "matrix matrix matrix"
                "table table recommendation"
              `,
            },
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
          }}
        >
          {/* Project Info - Perfil de Carga - Top Left */}
          <Box
            sx={{
              gridArea: 'project',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              width: '100%',
              minWidth: 0,
            }}
          >
            <ProjectInfoCard projectInfo={projectInfo} />
          </Box>

          {/* Costos Chart - Top Middle */}
          <Box
            sx={{
              gridArea: 'costos',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
              width: '100%',
              minWidth: 0,
            }}
          >
            <CostosChart alternatives={alternatives} isLoaded={isLoaded} delay={0.8} />
          </Box>

          {/* LCOE Chart - Top Right */}
          <Box
            sx={{
              gridArea: 'lcoe',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
              width: '100%',
              minWidth: 0,
            }}
          >
            <LcoeChart alternatives={alternatives} isLoaded={isLoaded} delay={1} />
          </Box>

          {/* Matriz de Decisión Section - Central */}
          <Box
            sx={{
              gridArea: 'matrix',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 2s ease-out 1.2s, transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s',
              width: '100%',
              minWidth: 0,
            }}
          >
            <MatrizDecision decisionMatrix={decisionMatrix} isLoaded={isLoaded} />
          </Box>

          {/* Table Section - Bottom Left */}
          <Box
            sx={{
              gridArea: 'table',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s',
              width: '100%',
              minWidth: 0,
            }}
          >
            <DisenoTable alternatives={alternatives} />
          </Box>

          {/* Primary Recommendation with Recommendations - Bottom Right */}
          <Box
            sx={{
              gridArea: 'recommendation',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s',
              width: '100%',
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                p: { xs: 1.5, sm: 2 },
                bgcolor: 'primary.50',
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'primary.300',
                minHeight: { xs: 'auto', lg: '100%' },
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 28, color: 'primary.700' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 0.5, fontSize: '0.7rem' }}>
                    Recomendación Principal
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.900', fontSize: '0.875rem' }}>
                    {kpis.primaryRecommendation}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.900', mb: 1.5, display: 'block', fontSize: '0.7rem' }}>
                  Recomendaciones Estratégicas
                </Typography>
                {strategicRecommendations.map((rec, index) => {
                  const processedContent = rec.recommendation
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
                  
                  return (
                    <Typography 
                      key={rec.id}
                      variant="caption" 
                      component="div"
                      sx={{ 
                        color: 'text.primary',
                        lineHeight: 1.7,
                        fontSize: '0.75rem',
                        mb: 1.5,
                        display: 'block',
                        '& strong': { 
                          fontWeight: 600, 
                          color: 'primary.900' 
                        },
                        '& em': { 
                          fontStyle: 'italic',
                          color: 'primary.700',
                        },
                        '&:last-child': { mb: 0 },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `<strong>${rec.title}:</strong> ${processedContent}`
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
