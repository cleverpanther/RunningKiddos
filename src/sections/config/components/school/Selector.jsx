import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem, FormControl } from '@mui/material';

function Field({ i, handle, StateList, StateListLibre }) {
    return (
        <div>
            <FormControl fullWidth>
                <Select
                    value={i}
                    onChange={handle}
                    sx={{
                        backgroundColor: '#F8F8FA', borderRadius: '10px', borderColor: '#ffffff',
                        height: '50px',
                        width: '200px',
                        '& .MuiInputBase-root': {
                            // Your custom styles for the input base
                            height: '50px',
                            width: '200px',
                            background: '#F8F8FA'
                        },
                    }}
                >
                    {StateList.map((stateItem, index) => (
                        <MenuItem key={index + 1} value={StateListLibre[index]}>
                            {stateItem}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

Field.propTypes = {
    i: PropTypes.number,
    handle: PropTypes.func,
    StateList: PropTypes.array,
    StateListLibre: PropTypes.object.isRequired
};

export default Field;




