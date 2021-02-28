/* eslint-disable react/jsx-no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// Main Functional Component
function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Currency Navbar Tabs"
        >
          <Tab label="Converter" />
          <Tab label="Exchange Rates" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}

// Sub component function to handle Tabpanel display
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default Header;
