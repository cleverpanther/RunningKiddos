import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

function AddTrack({ handleAddRow }) {
    return (
        <Button
            sx={{
                marginTop: '20px',
                background: '#B9EC51',
                width: '180px',
                height: '40px',
                borderRadius: '30px',
                color: '#333333',
                fontFamily: 'PingFang SC-Bold',
            }}
            onClick={handleAddRow}
        >
            <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{ marginRight: '6px' }} />
            ADD TRACKS
        </Button>
    );
};

AddTrack.propTypes = {
    handleAddRow: PropTypes.func
};

export default AddTrack;
