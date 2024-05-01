import * as React from 'react';

import { Box } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import CustomTab from '../CustomTab';
import { HEADER } from '../../../layouts/dashboard/config-layout';

// ----------------------------------------------------------------------

const SPACING = 30;

export default function ConfView() {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      sx={{
        marginTop: `${HEADER.H_MOBILE + SPACING}px`,
        marginBottom: '20px',
        background: '#FFFFFF',
        borderRadius: '20px',
        opacity: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        ...(lgUp && {
          px: 2,
          paddingTop: '29px',
          paddingLeft: '41px',
        }),
      }}
    >
      <Box lg = {5} sm = {12} sx={{justifyContent: 'space-around'}}>
        <CustomTab />
      </Box>
    </Box>
  );
}
