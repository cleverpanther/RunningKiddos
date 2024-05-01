import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from "@mui/material";

function ClassTitle({ title }) {
    return (
        <Typography
            sx={{
                fontSize: '40px',
                width: '500px',
                height: '60px',
                fontFamily: 'Public Sans',
                fontWeight: 'Bold',
                color: '#333333',
                lineHeight: '60px',
                marginBottom: '10px'
            }}
        >
            {title}
        </Typography>
    );
}
ClassTitle.propTypes = {
    title: PropTypes.string
};

export default ClassTitle;
