import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${theme.palette.primary[200]}`,
  borderRadius: theme.shape.borderRadius,
}));

const DisenoTable = ({ alternatives }) => {
  return (
    <StyledCard elevation={0} sx={{ height: { xs: 'auto', lg: '100%' }, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'primary.900', fontSize: '0.75rem' }}>
          Especificaciones Técnicas
        </Typography>
        <TableContainer 
          component={Paper} 
          variant="outlined"
          sx={{ 
            borderRadius: 1.5,
            border: '1px solid',
            borderColor: 'primary.200',
            overflowX: 'auto',
            overflowY: 'auto',
            flex: 1,
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              height: 8,
              width: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
            },
          }}
        >
          <Table 
            size="small" 
            stickyHeader
            sx={{
              minWidth: { xs: 600, sm: 'auto' },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>Sistema</TableCell>
                <TableCell sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>Contexto</TableCell>
                <TableCell sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>Generador</TableCell>
                <TableCell sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>Almacenamiento</TableCell>
                <TableCell sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>Autonomía</TableCell>
                <TableCell align="right" sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>CAPEX ($)</TableCell>
                <TableCell align="right" sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>OPEX Anual ($)</TableCell>
                <TableCell align="right" sx={{ 
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  color: '#ffffff !important',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  py: 1,
                  borderBottom: 'none',
                }}>LCOE ($/kWh)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alternatives.map((alt, index) => (
                <TableRow
                  key={alt.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: 'primary.50' },
                    '&:hover': { backgroundColor: 'primary.100', transition: 'background-color 0.2s' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: 'primary.900', fontSize: '0.7rem', py: 1 }}>
                    {alt.name}
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>
                    <Chip 
                      label={alt.context} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.100',
                        color: 'primary.900',
                        fontWeight: 500,
                        border: '1px solid',
                        borderColor: 'primary.300',
                        fontSize: '0.65rem',
                        height: 20,
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.7rem', py: 1 }}>{alt.design.generator}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.7rem', py: 1 }}>{alt.design.storage}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.7rem', py: 1 }}>{alt.design.autonomy}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.900', fontSize: '0.7rem', py: 1 }}>
                    ${alt.costs.capex.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.900', fontSize: '0.7rem', py: 1 }}>
                    ${alt.costs.opexAnnual.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.700', fontSize: '0.7rem', py: 1 }}>
                    ${alt.costs.lcoe.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </StyledCard>
  );
};

export default DisenoTable;
