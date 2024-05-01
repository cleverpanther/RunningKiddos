import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import PrintButton from './PrintButton';
import PrintableComponent from './PrintableComponent';

export function TabPrint() {
    const buttonStyle = {
        marginTop: '20px',
        width: '280px',
        height: '40px',
        borderRadius: '30px',
        color: '#333333',
        fontFamily: 'PingFang SC-Bold'
    };
    return (
        <Grid container spacing={2}>
            {/* First Row */}
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn1.png' alt="Awards1" />
                            <PrintableComponent />
                            <PrintButton componentToPrint={<PrintableComponent />} />
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn2.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#B9EC51', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                Awards Tab
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn3.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#B9EC51', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                Participation Tab
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>


            {/* Second Row */}
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn4.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#F9CF59', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                Awards List
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3} alignItems="left">
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn5.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#F9CF59', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                School Awards List
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            {/* Third Row */}
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn6.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#B4AFEF', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                Certificates
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn7.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#B4AFEF', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                Current Mileage Certificates
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img width={94} height={94} src='assets/Class_School/btn8.png' alt="Awards1" />
                            <Button
                                sx={{ background: '#B4AFEF', ...buttonStyle }}
                            // onClick={handleAddProgram}
                            >
                                Class Current Mileage Certs
                                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
