import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

function SubmitButton({ onClick }) {
  return (
    <Button
      variant="contained"
      sx={{
        marginTop: '50px',
        width: 112,
        height: 40,
        background: '#B9EC51',
        color: '#333333',
        fontFamily: 'Public Sans',
        fontWeight: 'Bold',
        borderRadius: "30px",
      }}
      onClick={onClick}
    >
      Submit
    </Button>
  );
};
SubmitButton.propTypes = {
  onClick: PropTypes.func
};

export default SubmitButton;
