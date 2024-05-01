import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { NAV } from './config-layout';

// ----------------------------------------------------------------------

// const SPACING = 30;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        opacity: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
        ...(lgUp && {
          px: 2,
          paddingTop: '29px',
          paddingLeft: '41px',
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
