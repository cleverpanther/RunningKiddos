import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

function AddProgramButton({ handleAddProgram }){
  return (
    <Button
      sx={{
        marginTop: '20px',
        background: '#B9EC51',
        width: '180px',
        height: '40px',
        borderRadius: '30px',
        color: '#333333',
        fontFamily: 'PingFang SC-Bold'
      }}
      onClick={handleAddProgram}
    >
      <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{ marginRight: '6px' }} />
      ADD PROGRAMS
    </Button>
  );
};

AddProgramButton.propTypes = {
    handleAddProgram: PropTypes.func
};

export default AddProgramButton;
