import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';

import ProgramRow from './ProgramRow';

function ProgramTable({ programData, handleInputChange, handleSaved, handleAchieved, handleDelete }) {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* Add other table header cells */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programData.filter((row) => row.isArchived === false).map((row) => (
            <ProgramRow
              key={row.id}
              row={row}
              handleInputChange={handleInputChange}
              handleSaved={handleSaved}
              handleAchieved={handleAchieved}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ProgramTable.propTypes = {
    programData: PropTypes.array,
    handleInputChange: PropTypes.func,
    handleSaved: PropTypes.func,
    handleAchieved: PropTypes.func,
    handleDelete: PropTypes.func
};

export default ProgramTable;
