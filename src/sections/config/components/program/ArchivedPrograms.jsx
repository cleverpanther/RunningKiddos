import React from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, Table, Button, TableRow, TableBody, TableHead, TextField, TableCell, TableContainer } from '@mui/material';

function ArchivedPrograms({ programData, handleInputChange, handleAchievedSaved, handleUnachieved }) {
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Name</TableCell>
                        <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Start</TableCell>
                        <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>End</TableCell>
                        <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {programData.filter((row) => row.isArchived === true).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={{
                                backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px',
                                height: '40px',
                                width: '200px',
                                '& .MuiInputBase-root': {
                                    // Your custom styles for the input base
                                    height: '40px',
                                    width: '200px',
                                    background: '#FFFFFF'
                                },
                            }}>
                                <TextField
                                    value={row.name}
                                    onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{
                                backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px',
                                height: '40px',
                                width: '200px',
                                '& .MuiInputBase-root': {
                                    // Your custom styles for the input base
                                    height: '40px',
                                    width: '200px',
                                    background: '#FFFFFF'
                                },
                            }}>
                                <TextField
                                    type='date'
                                    value={row.startDate ? new Date(row.startDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(row.id, 'start', e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{
                                backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px',
                                height: '40px',
                                width: '200px',
                                '& .MuiInputBase-root': {
                                    // Your custom styles for the input base
                                    height: '40px',
                                    width: '200px',
                                    background: '#FFFFFF'
                                },
                            }}>
                                <TextField
                                    type='date'
                                    value={row.endDate ? new Date(row.endDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(row.id, 'end', e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                                <Box sx={{ display: 'flex', width: '100px', justifyContent: 'space-between' }}>
                                    <Button
                                        sx={{
                                            background: '#97B9FF',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            color: '#333333',
                                            fontFamily: 'PingFang SC Regular',
                                            fontWeight: 'bold',
                                            minWidth: '40px'
                                        }}
                                        onClick={() => handleAchievedSaved(row)}
                                    >
                                        <img width={18} height={20} src="assets/Config/Config_Program/eye.png" alt="Logo" />
                                    </Button>
                                    <Button
                                        sx={{
                                            background: '#B9EC51',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            color: '#333333',
                                            fontFamily: 'PingFang SC Regular',
                                            fontWeight: 'bold',
                                            minWidth: '40px'
                                        }}
                                        onClick={() => handleUnachieved(row)}
                                    >
                                        <img width={18} height={18} src="assets/Config/Config_Program/link.png" alt="Logo" />
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
ArchivedPrograms.propTypes = {
    programData: PropTypes.array,
    handleInputChange: PropTypes.func,
    handleAchievedSaved: PropTypes.func,
    handleUnachieved: PropTypes.func
};
export default ArchivedPrograms;
