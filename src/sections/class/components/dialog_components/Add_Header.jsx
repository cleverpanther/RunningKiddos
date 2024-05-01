import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';

function AddMilesDialogHeader({ onClose }){
    return (
        <DialogTitle style={{ margin: '10pt 20pt 10pt 19pt' }}>
            <div style={{ fontSize: '24.5px', width: '412.07pt', height: '30pt' }}>Bulk Edit Laps for XSmall Testing Class</div>
            <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
                <div style={{ width: '30px', height: '30px', margin: '16pt 16pt' }} alt="close">✖</div>
            </IconButton>
        </DialogTitle>
    );
};
AddMilesDialogHeader.propTypes = {
    onClose: PropTypes.func
}

export default AddMilesDialogHeader;
