import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Typography } from "@mui/material";

function TotalDistance({ distance }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight:'20px'}}>
            <Button sx={{ backgroundColor: '#F8F8FA', borderRadius: '50%', minWidth: '40px', height: '40px', fontSize: '14px' }}>
                <img width={14} height={14} src="assets/Class_School/distance.png" alt="Print" />
            </Button>
            <Typography sx={{ width: '115px', fontFamily: 'Public Sans', fontSize: '16px', height: '40px', margin: '10px' }}>
                Total Distance
            </Typography>
            <Typography sx={{ fontFamily: 'Calibri', fontWeight: 'bold', fontStyle: 'italic', fontSize: '30px' }}>
                {distance}
            </Typography>
        </Box>
    );
}
TotalDistance.propTypes = {
    distance: PropTypes.string
}

export default TotalDistance;
