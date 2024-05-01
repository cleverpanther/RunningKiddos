import React from 'react';
import PropTypes from 'prop-types';

import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

const MyRadioGroup = ({ options, selectedValue, onChange }) => (
  <RadioGroup
    aria-label="radio-group"
    name="radio-group"
    value={selectedValue}
    onChange={onChange}
    sx={{width: '300px', marginLeft: '15px'}}
  >
    {options.map((option) => (
      <FormControlLabel
        id={option.id}
        key={option.id}
        value={option.value}
        control={
          <Radio
            sx={{
              '& .MuiSvgIcon-root': {
                width: 20,
                height: 20,
              },
              '&.Mui-checked .MuiSvgIcon-root': {
                display: 'block',
              },
            }}
          />
        }
        label={option.label}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        sx={{
          border: '2px solid #000',
          borderRadius: '10px',
          borderColor: '#97B9FF',
          padding: '8px 16px',
          display: 'block', // Display the labels as blocks (vertical)
          marginBottom: '8px', // Add some margin between the labels
        }}
      />
    ))}
  </RadioGroup>
);

MyRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MyRadioGroup;
