import PropTypes from "prop-types";
import React, { useState } from "react";

import { Tab, Box, Tabs, Typography } from "@mui/material";

import { Users } from "./components/user/Users";
import { Awards } from "./components/awards/Awards";
import { Tracks } from "./components/tracks/Tracks";
import { School } from "./components/school/School";
import { Devices } from "./components/device/Devices";
import { Classes } from "./components/classes/Classes";
import { Program } from "./components/program/Program";
import { Students } from "./components/students/Students";

const tabStyles = {
  width: 112,
  height: 40,
  borderRadius: "30px",
  background: '#F6F7F9',
  fontFamily: 'PingFang SC-Bold',
  color: '#333333',
  border: "none",
  // padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  marginRight: '10px',
  "&.Mui-selected": {
    backgroundColor: "#333333",
    border: "none",
    color: "#FFFFFF",
  },
};

const tabPanelStyles = {
  paddingLeft: 0,
};

const tabs = [
  { label: "School", component: <School /> },
  { label: "Program", component: <Program /> },
  { label: "Classes", component: <Classes /> },
  { label: "Students", component: <Students /> },
  { label: "Awards", component: <Awards /> },
  { label: "Tracks", component: <Tracks /> },
  { label: "Users", component: <Users /> },
  { label: "Devices", component: <Devices /> },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} sx={{ paddingLeft: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CustomTab() {
  const [value, setValue] = useState("School");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        padding={0}
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {tabs.map(({ label }) => (
          <Tab
            key={label}
            value={label}
            label={label}
            wrapped
            {...a11yProps(label)}
            sx={tabStyles}
          />
        ))}
      </Tabs>

      {tabs.map(({ label, component }) => (
        <TabPanel key={label} value={value} index={label} padding={0} sx={tabPanelStyles}>
          {component}
        </TabPanel>
      ))}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}