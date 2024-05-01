import React from "react";
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function Common({ lg }) {
    return (
        <Grid lg={lg}>
            <Typography>  </Typography>
        </Grid>
    );
}
Common.propTypes = {
    lg: PropTypes.number
};
export default Common;
