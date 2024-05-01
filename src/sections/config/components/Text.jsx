import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

function Text({ t, s, m }) {
    return (
        <div>
            <Typography
                sx={{
                    margin: m,
                    fontSize: s,
                    fontWeight: 'bold',
                    fontFamily: 'Public Sans',
                    color: '#333333',
                }}
            >
                {t}
            </Typography>
        </div>
    );
};

Text.propTypes = {
    t: PropTypes.string,
    s: PropTypes.string,
    m: PropTypes.string
};

export default Text;
