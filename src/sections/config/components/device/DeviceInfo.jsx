import * as React from 'react';

import { Typography } from '@mui/material';

import Text from '../Text';

export function DeviceInfo() {
  return (
    <div>
      <Text t='Devices' s='40px' b='bold'/>
      <Typography mt={4} mb={5} sx={{ width: '1038px', height: '18px', fontSize: '14px', fontFamily: 'Public Sans', fontWeight: '500', color: 'rgb(51, 51, 51, 0.6)', lineHeight: '18px' }}>The Devices page provides a reference list of devices used to scan barcodes for your account. The list notes which devices have been synced and at what time. Please reference this page if you have questions regarding sync information of a specific device.</Typography>
    </div>
  );
}



