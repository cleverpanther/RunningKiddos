import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '@mui/material';

function DialogHeader({ studentName }) {
  return (
    <DialogTitle>
      Awards for {studentName}
    </DialogTitle>
  );
};

DialogHeader.propTypes = {
  studentName: PropTypes.string
};

export default DialogHeader;
