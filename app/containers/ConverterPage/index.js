/**
 * Converter Page File
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectCurrencyList,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadExchangeList } from 'containers/App/actions';
import { getCountryByCode } from 'containers/App/commons';
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import reducer from 'containers/App/reducer';
import saga from './saga';

// Common Dependencies

const key = 'exchangerates';

export function ConverterPage({ loading, error, list, loadList }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [rates, setRates] = React.useState([]);
  const [loadingRates, setLoading] = React.useState(false);
  const [leftCurrency, setLeftCurrency] = React.useState(false);
  const [rightCurrency, setRightCurrency] = React.useState(false);

  useEffect(() => {
    if (list.length === 0 && !loadingRates) {
      setLoading(true);
      // Load list if empty
      loadList();
      return;
    }
    setRates(Object.keys(list).map(keyItem => [keyItem, list[keyItem]]));
  }, [list]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Currency converter</Typography>
      <Typography variant="body1">
        Please enter the amount to convert on any field
      </Typography>
      {loading && <LinearProgress />}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Paper
            variant="outlined"
            square
            elevation={4}
            style={{ padding: 40 }}
          >
            <ConverterForm rates={rates} />
          </Paper>
          <Typography variant="body1" style={{ margin: '20px 40px' }}>
            1 USD = 0.83
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper
            variant="outlined"
            square
            elevation={4}
            style={{ padding: 40 }}
          >
            <ConverterForm rates={rates} />
          </Paper>
          <Typography variant="body1" style={{ margin: '20px 40px' }}>
            1 USD = 0.83
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

function ConverterForm({ rates }) {
  return (
    <Box>
      <Typography variant="body2">Currency</Typography>
      <Autocomplete
        id="combo-box-demo"
        options={rates}
        getOptionLabel={option =>
          `${
            getCountryByCode(option[0])[0].name
              ? getCountryByCode(option[0])[0].name
              : ''
          } (${option[0]})`
        }
        style={{ margin: '20px auto' }}
        renderInput={params => <TextField {...params} variant="outlined" />}
      />

      <Typography variant="body2">Enter amount</Typography>
      <OutlinedInput
        id="outlined-basic"
        style={{ margin: '20px auto', width: '100%' }}
        endAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </Box>
  );
}

ConverterPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  list: PropTypes.any,
  loadList: PropTypes.func,
};

ConverterForm.propTypes = {
  rates: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  list: makeSelectCurrencyList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadList: () => {
      dispatch(loadExchangeList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConverterPage);
