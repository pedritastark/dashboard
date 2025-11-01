import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemIcon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
}));

const RecommendationBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(135deg, #eaefff 0%, #d8e1ff 100%)',
  border: `1px solid ${theme.palette.primary[300]}`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3],
    borderColor: theme.palette.primary[400],
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

const RecommendationsCard = ({ recommendations }) => {
  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <List sx={{ p: 0 }}>
          {recommendations.map((rec, index) => (
            <ListItem key={rec.id} sx={{ p: 0, mb: 2, display: 'block', alignItems: 'flex-start' }}>
              <RecommendationBox>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <CheckCircleIcon 
                      sx={{ 
                        fontSize: 28,
                        color: 'primary.700',
                      }} 
                    />
                  </ListItemIcon>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'primary.900',
                        mb: 1,
                      }}
                    >
                      {rec.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      component="div"
                      sx={{ 
                        color: 'text.primary',
                        lineHeight: 1.7,
                        '& strong': { 
                          fontWeight: 600, 
                          color: 'primary.900' 
                        },
                        '& em': { 
                          fontStyle: 'italic',
                          color: 'primary.700',
                        }
                      }}
                      dangerouslySetInnerHTML={{
                        __html: rec.recommendation
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      }}
                    />
                  </Box>
                </Box>
              </RecommendationBox>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default RecommendationsCard;
