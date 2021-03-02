/* eslint-disable react/jsx-no-undef */
/** Header Main Component
 *
 * Created By: John Walter Ramos | 02/26/2021
 *
 */
import React from 'react';

// Common Dependencies
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';

// Local Dependencies
// import TabPanel from './TabPanel';
import ConverterPage from 'containers/ConverterPage';
import ExchangeRatesPage from 'containers/ExchangeRatesPage';
// Main Functional Component
export function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (!event) {
      // if event attributes were inaccessible, return
      return;
    }
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" style={{ marginBottom: 20 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Converter" />
          <Tab label="Exchange Rates" />
        </Tabs>
      </AppBar>
      <Box>
        <div role="tabpanel" hidden={value !== 0}>
          {<ConverterPage />}
        </div>

        <div role="tabpanel" hidden={value !== 1}>
          {<ExchangeRatesPage />}
        </div>
      </Box>
    </div>
  );
}

export default Header;
