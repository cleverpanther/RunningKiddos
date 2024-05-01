import PropTypes from "prop-types";
import React, { useState } from "react";

import { Tab, Box, Tabs, Typography } from "@mui/material";

import { TabMiles } from "./Tabs/tab_miles";
import { TabPrint } from "./Tabs/tab_print";
import { TabAwards } from "./Tabs/tab_awards";
import { TabParticipation } from "./Tabs/tab_participation";

const tabStyles = {
  width: 112,
  height: 40,
  borderRadius: "30px",
  background: '#F6F7F9',
  fontFamily: 'PingFang SC-Bold',
  color: '#333333',
  border: "none",
  padding: "15px 30px",
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
  { label: "Miles", component: <TabMiles /> },
  { label: "Awards", component: <TabAwards /> },
  { label: "Participation", component: <TabParticipation /> },
  { label: "Print", component: <TabPrint /> },
];

function TabPanel({ children, value, index,  ...other }) {
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
  const [value, setValue] = useState("Miles");

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
        <TabPanel key={label} value={value} index={label}  padding={0} sx={tabPanelStyles}>
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