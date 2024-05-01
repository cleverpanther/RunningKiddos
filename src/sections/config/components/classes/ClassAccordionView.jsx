import React from 'react';

import { Button, AccordionDetails } from '@mui/material';

function ClassAccordionView() {
  return (
    <AccordionDetails>
      <div>
        <div>
          <Button
            sx={{
              marginTop: '20px',
              background: '#B9EC51',
              width: '180px',
              height: '40px',
              borderRadius: '30px',
              color: '#333333',
              fontFamily: 'Public Sans'
            }}
          >
            Copy/Paste Students
          </Button>
          <Button
            sx={{
              marginTop: '20px',
              background: '#B9EC51',
              width: '180px',
              height: '40px',
              borderRadius: '30px',
              color: '#333333',
              fontFamily: 'Public Sans'
            }}
          >
            Add Students
          </Button>
        </div>
        {/* Render Table here */}
      </div>
    </AccordionDetails>
  );
};

export default ClassAccordionView;
