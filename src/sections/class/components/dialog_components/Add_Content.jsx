import React from 'react';
import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DialogContent from '@mui/material/DialogContent';

function AddMilesDialogContent({ selectedOption, handleOptionChange, courseData }) {
    return (
        <DialogContent style={{ marginLeft: '19pt' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            style={{
                                width: '150pt',
                                height: '30pt',
                                backgroundColor: '#F6F7F9',
                                border: '1px solid #F6F7F9', // Corrected typo here
                                borderRadius: '7.5pt',
                                fontSize: '13.5pt',
                                padding: '0 10pt 0 4.5pt'
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
                        {
                            selectedOption && (
                                <div style={{ marginLeft: '20pt' }}>
                                    <input style={{ width: '150pt', height: '30pt', padding: '0 10pt 0 12.5pt', backgroundColor: '#F6F7F9', borderRadius: '7.5pt', fontSize: '13.5pt', border: '1px solid #F6F7F9' }} type="date" id="start" name="trip-start" value="2023-12-11" min="2000-01-01" max="2100-12-31" />
                                </div>
                            )
                        }

                    </div>

                    {selectedOption && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '13.5pt' }}>
                                <p style={{ marginLeft: '27pt', color: '#333333' }}>Students</p>
                                <p style={{ marginLeft: '145.5pt', color: '#333333' }}>Laps</p>
                            </div>
                            <div style={{ width: '320pt', height: '45pt', backgroundColor: '#F8F8FA', borderRadius: '7.5pt', border: '1px solid #F8F8FA', display: 'flex', textAlign: 'center', marginTop: '8pt' }}>
                                <div style={{ paddingTop: '11.5pt', paddingLeft: '28pt', fontSize: '14.5pt' }}><b>James Eddie</b></div>
                                <div style={{ marginLeft: '115pt', marginTop: '4.5pt' }}>
                                    <input
                                        type="number"
                                        style={{
                                            marginTop: '2.5pt',
                                            height: '30pt',
                                            borderRadius: '7.5pt',
                                            border: '1px solid #F8F8FA',
                                            position: 'relative',
                                            textAlign: 'left',
                                            fontSize: '13.5pt',
                                            width: '75pt',
                                            outline: 'none',
                                            backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%220%200%2050%2067%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20stroke-width%3D%222%22%3E%3Cline%20x1%3D%221%22%20x2%3D%2250%22%20y1%3D%2233.5%22%20y2%3D%2233.5%22%20stroke%3D%22%23D8D8D8%22%2F%3E%3Cpolyline%20transform%3D%22translate(25%2020)%20rotate(45)%20translate(-25%20-20)%22%20points%3D%2219%2026%2019%2014%2032%2014%22%20stroke%3D%22%23000%22%2F%3E%3Cpolyline%20transform%3D%22translate(25%2045)%20rotate(225)%20translate(-25%20-45)%22%20points%3D%2219%2052%2019%2039%2032%2039%22%20stroke%3D%22%23000%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
                                            backgroundPosition: 'center right',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            caretColor: 'transparent',
                                            paddingLeft: '6.5pt'
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
    );
};
AddMilesDialogContent.propTypes = {
    selectedOption: PropTypes.string,
    handleOptionChange: PropTypes.func,
    courseData: PropTypes.array
};

export default AddMilesDialogContent;
