import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from "@mui/material";

function ClassSelector({ classData, handleClassTitleChange }) {
    return (
        <Select
            onChange={(e) => handleClassTitleChange(e.target.value)}
            sx={{
                marginTop: '100px',
                height: '40px',
                width: '250px',
                marginRight: '50px',
                '& .MuiInputBase-root': {
                    height: '40px',
                    width: '250px',
                    background: '#FFFFFF'
                },
            }}
        >
            {classData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    );
}
ClassSelector.propTypes = {
    classData: PropTypes.array,
    handleClassTitleChange: PropTypes.func
};
export default ClassSelector;
