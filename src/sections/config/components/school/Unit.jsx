import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem, FormControl } from '@mui/material';

function Unit({ i, handle }) {
    return (
        <div>
            <FormControl fullWidth>
                <Select
                    value={i}
                    onChange={handle}
                    sx={{
                        backgroundColor: '#F8F8FA', borderRadius: '10px', borderColor: '#ffffff',
                        height: '50px',
                        width: '310px',
                        '& .MuiInputBase-root': {
                            // Your custom styles for the input base
                            height: '50px',
                            width: '310px',
                            background: '#F8F8FA'
                        },
                    }}
                >
                    <MenuItem value={1}>mile</MenuItem>
                    <MenuItem value={2}>kilometer</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

Unit.propTypes = {
    i: PropTypes.number,
    handle: PropTypes.func
};

export default Unit;




