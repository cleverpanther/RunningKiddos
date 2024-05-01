import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

function CustomTypography({ mt, mb, children }) {
  return (
    <Typography
      mt={mt}
      mb={mb}
      sx={{
        width: '1038px',
        height: '18px',
        fontSize: '14px',
        fontFamily: 'Public Sans',
        fontWeight: '500',
        color: 'rgb(51, 51, 51, 0.6)',
        lineHeight: '18px',
        textAlign: 'justify'
      }}
    >
      {children}
    </Typography>
  );
};

CustomTypography.propTypes = {
    mt: PropTypes.number,
    mb: PropTypes.number,
    children: PropTypes.string
};

export default CustomTypography;
