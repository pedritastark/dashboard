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
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <TableContainer 
          component={Paper} 
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.200',
            overflow: 'hidden',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, #2a11e4 0%, #371fff 100%)' }}>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>Sistema</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>Contexto</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>Generador</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>Almacenamiento</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>Autonomía</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>
                  CAPEX ($)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>
                  OPEX Anual ($)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.875rem' }}>
                  LCOE ($/kWh)
                </TableCell>
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
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: 'primary.900' }}>
                    {alt.name}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={alt.context} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.100',
                        color: 'primary.900',
                        fontWeight: 500,
                        border: '1px solid',
                        borderColor: 'primary.300',
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{alt.design.generator}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{alt.design.storage}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{alt.design.autonomy}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.900' }}>
                    ${alt.costs.capex.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.900' }}>
                    ${alt.costs.opexAnnual.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.700' }}>
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
