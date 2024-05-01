
import PropTypes from 'prop-types';
import React, { useState } from 'react'; // Import PropTypes
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import './spinbox.css';


const AddMilesDialog = ({ open, handleClose, onSave, courseData }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleSave = () => {
        onSave(selectedOption);
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
        <Dialog open={open} onClose={handleCancel} sx={dialogStyle} >
            <div style={{ backgroundColor: '#ffffff', width: '361.5pt' }}>
                <DialogTitle style={{ marginLeft: '4pt' }}>
                    <div style={{ fontSize: '11.5pt', width: '193.5pt', height: '17pt' }}>Details for Knapp Elise (3357137)</div>
                    <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 0, top: 0 }}>
                        <div style={{ width: '12px', height: '12px', marginTop: '2pt', marginRight: '9.5pt' }} alt="close">✖</div>
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ marginLeft: '4pt' }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '9pt' }}>
                        <p style={{ color: '#333333' }}><b>First Name</b></p>
                        <p style={{ marginLeft: '120.5pt', color: '#333333' }}><b>Last Name</b></p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '9pt' }}>
                        <div style={{ borderRadius: '5pt', padding: '4.5pt 0 0 7.5pt', width: '150pt', height: '20pt', backgroundColor: '#F8F8FA' }}><b>James Eddie</b></div>
                        <div style={{ marginLeft: '18.5pt', borderRadius: '5pt', padding: '4.5pt 0 0 7.5pt', width: '150pt', height: '20pt', backgroundColor: '#F8F8FA' }}><b>James Eddie</b></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '9pt' }}>
                        <p style={{ color: '#333333' }}><b>Grade</b></p>
                        <p style={{ marginLeft: '142.5pt', color: '#333333' }}><b>Class</b></p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            style={{
                                width: '150pt',
                                height: '20pt',
                                backgroundColor: '#F8F8FA',
                                border: '1px solid #F8F8FA', // Corrected typo here
                                borderRadius: '5pt',
                                fontSize: '9pt',
                            }}>
                            <MenuItem value="" disabled >
                                <em>Select an Option</em>
                            </MenuItem>
                            {Array.isArray(courseData) ? (
                                courseData.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <b>{option.name}</b>
                                    </MenuItem>
                                ))
                            ) : null}
                            <MenuItem value={1}>mile</MenuItem>
                            <MenuItem value={2}>kilometer</MenuItem>
                        </Select>
                        <Select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            style={{
                                width: '150pt',
                                height: '20pt',
                                backgroundColor: '#F8F8FA',
                                border: '1px solid #F8F8FA', // Corrected typo here
                                borderRadius: '5pt',
                                fontSize: '9pt',
                                marginLeft: '18.5pt'
                            }}>
                            <MenuItem value="" disabled >
                                <em>Select an Option</em>
                            </MenuItem>
                            {Array.isArray(courseData) ? (
                                courseData.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <b>{option.name}</b>
                                    </MenuItem>
                                ))
                            ) : null}
                        </Select>
                    </div>


                </DialogContent>
                <DialogActions>
                    <div style={{ display: 'flex', textAlign: 'center' }}>
                        <Button
                            sx={{
                                background: '#B9EC51',
                                width: '38.5pt',
                                height: '20pt',
                                borderRadius: '45pt',
                                color: '#333333',
                                fontFamily: 'Public Sans',
                                marginRight: '230pt',
                                fontSize: '9pt'
                            }}
                            onClick={handleSave}
                        >
                            SAVE
                        </Button>
                        <Button
                            onClick={handleSave}
                            style={{
                                marginRight: '6.5pt'
                            }}
                        >
                            ☠️
                        </Button>
                    </div>
                </DialogActions>
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
