import React from 'react';
import PropTypes from 'prop-types';

import { Button, DialogActions } from '@mui/material';

function DialogFooter({ onClose }) {
  return (
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  );
};

DialogFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DialogFooter;
