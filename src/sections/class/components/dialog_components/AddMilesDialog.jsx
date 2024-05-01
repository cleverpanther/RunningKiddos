import PropTypes from 'prop-types';
import React, { useState } from 'react'; 

import Dialog from '@mui/material/Dialog';

import './spinbox.css';
import AddMilesDialogHeader from './Add_Header';
import AddMilesDialogFooter from './Add_Footer';
import AddMilesDialogContent from './Add_Content';


const AddMilesDialog = ({ open, handleClose, onSave, courseData }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [input1Value, setInput1Value] = useState('');
    const [input2Value, setInput2Value] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setInput1Value('');
        setInput2Value('');
    };


    const handleSave = () => {
        onSave(selectedOption, input1Value, input2Value);
        handleClose();
    };

    const handleCancel = () => {
        handleClose();
    };

    const dialogStyle = {
        width: '100%',
        height: '100vh',
    };

    return (
        <Dialog open={open} onClose={handleCancel} sx={dialogStyle}>
            <div style={{ backgroundColor: '#ffffff' }}>
                <AddMilesDialogHeader onClose={handleCancel} />
                <AddMilesDialogContent selectedOption={selectedOption} handleOptionChange={handleOptionChange} courseData={courseData} />
                <AddMilesDialogFooter onSave={handleSave} selectedOption={selectedOption} />
            </div>
        </Dialog>
    );
};

// Add prop types validation
AddMilesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    courseData: PropTypes.array.isRequired
};

export default AddMilesDialog;
