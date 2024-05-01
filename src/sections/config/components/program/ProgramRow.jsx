import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, TableRow, TableCell, TextField } from '@mui/material';

function ProgramRow({ row, handleInputChange, handleSaved, handleAchieved, handleDelete }) {
  return (
    <TableRow key={row.id}>
      <TableCell>
        <TextField value={row.name} onChange={(e) => handleInputChange(row.id, 'name', e.target.value)} />
      </TableCell>
      {/* Add other cells for start and end date */}
      <TableCell>
        <Box sx={{ display: 'flex', width: '150px', justifyContent: 'space-between' }}>
          <Button
            sx={{
              background: '#97B9FF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: '#333333',
              fontFamily: 'PingFang SC Regular',
              fontWeight: 'bold',
              minWidth: '40px'
            }}
            onClick={() => handleSaved(row)}
          >
            <img width={18} height={20} src="assets/Config/Config_Program/save.png" alt="Save" />
          </Button>
          <Button
            sx={{
              background: '#FFFFFF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: '#333333',
              fontFamily: 'PingFang SC Regular',
              fontWeight: 'bold',
              minWidth: '40px'
            }}
            onClick={() => handleAchieved(row)}
          >
            <img width={22} height={22} src="assets/Config/Config_Program/action.png" alt="Achieved" />
          </Button>
          <Button
            sx={{
              background: '#FFFFFF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: '#333333',
              fontFamily: 'PingFang SC Regular',
              fontWeight: 'bold',
              minWidth: '40px'
            }}
            onClick={() => handleDelete(row.id)}
          >
            <img width={18} height={18} src="assets/Config/Config_Program/ban.png" alt="Delete" />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

ProgramRow.propTypes = {
    row: PropTypes.array,
    handleInputChange: PropTypes.func, 
    handleSaved: PropTypes.func, 
    handleAchieved: PropTypes.func, 
    handleDelete: PropTypes.func
};

export default ProgramRow;
