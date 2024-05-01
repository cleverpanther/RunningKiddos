import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';

function ClassTable({ accordion }){
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', maxHeight: '400px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>First Name</TableCell>
            <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accordion.students.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                {row.firstName}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                {row.lastName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ClassTable.propTypes = {
  accordion: PropTypes.object
};

export default ClassTable;
