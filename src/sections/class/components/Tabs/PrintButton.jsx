import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const PrintButton = ({ componentToPrint }) => {
    const handlePrint = () => {
        window.print(); // Invoke the browser's print dialog
    };
    const buttonStyle = {
        marginTop: '20px',
        width: '280px',
        height: '40px',
        borderRadius: '30px',
        color: '#333333',
        fontFamily: 'PingFang SC-Bold'
    };

    return (
            <Button
                sx={{ background: '#B9EC51', ...buttonStyle }}
                onClick={handlePrint}
            >
                Mile Tab {componentToPrint ? componentToPrint.name : ''}
                <img width={18} height={18} src="assets/Class_School/print.png" alt="Logo" style={{ marginLeft: '6px' }} />
            </Button>
    );
};

PrintButton.propTypes = {
    componentToPrint: PropTypes.element // Component to be printed
  };

export default PrintButton;
