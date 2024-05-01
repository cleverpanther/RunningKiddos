import React from 'react';
import PropTypes from 'prop-types';

import { Button, TextField, AccordionDetails } from '@mui/material';

function ClassAccordionDetails({ accordion, index, handleSave, handleCancel, handleInputChange }) {
  return (
    <AccordionDetails>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            label="Name"
            value={accordion.name}
            onChange={(e) =>
              handleInputChange(e.target.value, 'name', index)
            }
            fullWidth
          />
          {/* Other TextFields for Teacher and Grade */}
        </div>
        <div>
          <Button
            sx={{
              marginTop: '20px',
              background: '#B9EC51',
              width: '150px',
              height: '40px',
              borderRadius: '30px',
              color: '#333333',
              fontFamily: 'Public Sans',
              marginRight: '20px'
            }}
            onClick={() => handleSave(accordion)}>
            Create Class
          </Button>
          <Button
            sx={{
              marginTop: '20px',
              background: '#97B9FF',
              width: '100px',
              height: '40px',
              borderRadius: '30px',
              color: '#333333',
              fontFamily: 'Public Sans'
            }}
            onClick={() => handleCancel(index)}>
            Cancel
          </Button>
        </div>
      </div>
    </AccordionDetails>
  );
};
ClassAccordionDetails.propTypes = {
    accordion: PropTypes.array, 
    index: PropTypes.number, 
    handleSave: PropTypes.func, 
    handleCancel: PropTypes.func,
    handleInputChange: PropTypes.func.isRequired
};
export default ClassAccordionDetails;
