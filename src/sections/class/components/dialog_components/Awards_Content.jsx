import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

function AwardsTable({ awardsData }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Distance</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Earned</TableCell>
          <TableCell>Awarded</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {awardsData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.distance}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.earned}</TableCell>
            <TableCell>{row.awarded}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

AwardsTable.propTypes = {
  awardsData: PropTypes.arrayOf(
    PropTypes.shape({
      distance: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      earned: PropTypes.string.isRequired,
      awarded: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default AwardsTable;
