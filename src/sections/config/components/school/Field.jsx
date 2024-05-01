import React from 'react';
import PropTypes from 'prop-types';

import { TextField, FormControl } from '@mui/material';

function Field({ schoolData, fieldName, handleInputChange, size }) {
    return (
        <div>
            <FormControl fullWidth>
                <TextField
                    value={schoolData[fieldName]} // Accessing dynamic property based on fieldName
                    onChange={(e) => handleInputChange(fieldName, e.target.value)} // Using fieldName as key
                    sx={{
                        backgroundColor: '#F8F8FA',
                        borderRadius: '10px',
                        border: 'none',
                        height: '50px',
                        width: size,
                        '& .MuiInputBase-root': {
                            height: '50px',
                            width: size,
                            background: '#F8F8FA'
                        },
                    }}
                />
            </FormControl>
        </div>
    );
}

Field.propTypes = {
    schoolData: PropTypes.object.isRequired, // Changed from array to object
    handleInputChange: PropTypes.func.isRequired,
    fieldName: PropTypes.string.isRequired, // Renamed key to fieldName
    size: PropTypes.string.isRequired
};

export default Field;
