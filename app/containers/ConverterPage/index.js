/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
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
  makeSelectConvertError,
  makeSelectConvertLoading,
  makeSelectConvertData,
} from 'containers/App/selectors';
import { loadExchangeList, sendToConvert } from 'containers/App/actions';
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

export function ConverterPage({
  loading,
  error,
  list,
  loadList,
  startCurrencyConvert,
  convertedResult,
  convertLoading,
  convertError,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [rates, setRates] = React.useState([]);
  const [loadingRates, setLoading] = React.useState(false);
  const [leftCurrency, setLeftCurrency] = React.useState(false);
  const [rightCurrency, setRightCurrency] = React.useState(false);
  const [leftFocus, setLeftFocus] = React.useState(false);
  const [rightFocus, setRightFocus] = React.useState(false);
  const [leftConvertedValue, setLeftConvertValue] = React.useState(0);
  const [rightConvertedValue, setRightConvertValue] = React.useState(0);

  useEffect(() => {
    if (list.length === 0 && !loadingRates) {
      setLoading(true);
      // Load list if empty
      loadList();
      return;
    }
    setRates(Object.keys(list).map(keyItem => [keyItem, list[keyItem]]));
  }, [list]);

  useEffect(() => {
    console.log(leftConvertedValue);
    if (leftConvertedValue >= 1) {
      setLeftFocus(true);
      setRightFocus(false);
      startCurrencyConvert(leftCurrency, rightCurrency, leftConvertedValue);
    }
  }, [leftConvertedValue]);

  useEffect(() => {
    console.log(rightConvertedValue);
    if (rightConvertedValue >= 1) {
      setLeftFocus(false);
      setRightFocus(true);
      startCurrencyConvert(leftCurrency, rightCurrency, rightConvertedValue);
    }
  }, [rightConvertedValue]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Currency converter</Typography>
      <Typography variant="body1">
        Please enter the amount to convert on any field
      </Typography>
      {loading && <LinearProgress />}

      {error && (
        <Typography variant="body2" color="secondary">
          Something went wrong. Please try again!
        </Typography>
      )}
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
            <ConverterForm
              rates={rates}
              setCurrencyValue={val => {
                setLeftConvertValue(val);
              }}
              currValue={leftConvertedValue}
              setCurrencyType={type => {
                setLeftCurrency(type);
              }}
            />
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
            <ConverterForm
              rates={rates}
              setCurrencyValue={val => {
                setRightConvertValue(val);
              }}
              currValue={rightConvertedValue}
              setCurrencyType={type => {
                setRightCurrency(type);
              }}
            />
          </Paper>
          <Typography variant="body1" style={{ margin: '20px 40px' }}>
            1 USD = 0.83
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

function ConverterForm({
  rates,
  setCurrencyValue,
  currValue,
  setCurrencyType,
}) {
  const handleValueChange = event => {
    setCurrencyValue(event.target.value);
  };

  const handleCurrencyChange = (event, value) => {
    if (event) {
      setCurrencyType(value[0]);
      return;
    }
    setCurrencyType(false);
  };

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
        onChange={handleCurrencyChange}
      />

      <Typography variant="body2">Enter amount</Typography>
      <OutlinedInput
        id="outlined-basic"
        style={{ margin: '20px auto', width: '100%' }}
        endAdornment={<InputAdornment position="start">$</InputAdornment>}
        value={currValue}
        onChange={e => handleValueChange(e)}
      />
    </Box>
  );
}

ConverterPage.propTypes = {
  setCurrencyType: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  list: PropTypes.any,
  loadList: PropTypes.func,
  startCurrencyConvert: PropTypes.func,
  convertedResult: PropTypes.any,
  convertLoading: PropTypes.bool,
  convertError: PropTypes.any,
};

ConverterForm.propTypes = {
  rates: PropTypes.any,
  setCurrencyValue: PropTypes.func,
  currValue: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  // currency rates list
  list: makeSelectCurrencyList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

  // converted currency props
  convertedResult: makeSelectConvertData(),
  convertLoading: makeSelectConvertLoading(),
  convertError: makeSelectConvertError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadList: () => {
      dispatch(loadExchangeList());
    },
    startCurrencyConvert: (leftCurrency, rightCurrency, valueToConvert) => {
      dispatch(sendToConvert(leftCurrency, rightCurrency, valueToConvert));
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
