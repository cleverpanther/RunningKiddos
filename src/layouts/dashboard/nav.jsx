
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import Scrollbar from 'src/components/scrollbar';
import { NavItem } from 'src/components/navigationitem';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

export default function Nav({ openNav, onCloseNav, programs  }) {
  
  const pathname = usePathname();
  const [programindex, setProgramindex] = useState(1);
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const handleSessionChange = (value) => {
    setProgramindex(value)
    localStorage.setItem("programId", value)
}

  const LogoMark = (
    <Box
      sx={{
        my: 1, mx: 1, py: 2, px: 2.5, display: 'flex',
        borderRadius: 1.5, alignItems: 'center', textAlign: 'center',
      }}
    >
      <img src="assets/logo.png" alt="Logo" />
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            width: 188, height: 32, fontSize: 24,
            fontFamily: 'Ramabhadra, Ramabhadra',
            fontWeight: 400, color: '#FFFFFF',
          }}
        >
          Running Kiddos
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {LogoMark}

      {programs ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label=""
          value={programindex}
          onChange={(e) => handleSessionChange(e.target.value)}
          sx={{
            height: '60px',
            marginLeft: '13px',
            marginRight: '11px',
            marginTop: '10px',
            background: '#B9EC51',
            color: '#282828',
            fontSize: '22px',
            fontFamily: 'PingFang SC-Bold',
            textAlign: 'center',
          }}
        >
          {programs.map((program, index) => (
            <MenuItem key={program.id} value={index + 1}>
              {`${program.name}`}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Typography variant="body1">Loading courses...</Typography>
      )}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            bgcolor: '#282828',
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  programs:PropTypes.array
};


