import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

function AddMilesDialogFooter({ onSave, selectedOption }) {
    return (
        <DialogActions>
            {selectedOption && (
                <Button
                    sx={{
                        background: '#B9EC51',
                        width: '72.5pt',
                        height: '30pt',
                        borderRadius: '45pt',
                        color: '#333333',
                        fontFamily: 'Public Sans',
                        margin: '0 333pt 15pt 0',
                        fontSize: '13.5pt'
                    }}
                    onClick={onSave}
                >
                    SAVE
                </Button>

            )}
        </DialogActions>
    );
};
AddMilesDialogFooter.propTypes = {
    onSave: PropTypes.func,
    selectedOption: PropTypes.string
};

export default AddMilesDialogFooter;
