import React from 'react';
import PropTypes from 'prop-types';

import { Button } from "@mui/material";

function AddMilesButton({ onClick }) {
    return (
        <Button
            sx={{
                marginTop: '100px',
                background: '#B9EC51',
                width: '120px',
                height: '40px',
                borderRadius: '30px',
                color: '#333333',
                fontFamily: 'Public Sans'
            }}
            onClick={onClick}
        >
            <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{ marginRight: '6px' }} />
            Add Miles
        </Button>
    );
}
AddMilesButton.propTypes = {
    onClick: PropTypes.func
};
export default AddMilesButton;
