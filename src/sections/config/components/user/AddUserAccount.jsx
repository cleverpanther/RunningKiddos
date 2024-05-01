import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

function AddUserAccount({ handleAddRow }){
  return (
    <Button 
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            background: '#B9EC51', 
            width: '190px', 
            height: '40px', 
            borderRadius: '30px', 
            color: '#333333', 
            fontFamily: 'PingFang SC-Bold'
          }}
          onClick={handleAddRow}
        >
          NEW USER ACCOUNT
        </Button>
  );
};

AddUserAccount.propTypes = {
    handleAddRow: PropTypes.func
};

export default AddUserAccount;
