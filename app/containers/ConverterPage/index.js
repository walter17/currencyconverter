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
  const [lockedPointers, setLocked] = React.useState(true);
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
    if (leftConvertedValue >= 1 && leftFocus && !lockedPointers) {
      setRightFocus(false);
      // Perform conversion calls
      startCurrencyConvert(leftCurrency, rightCurrency, leftConvertedValue);
    }
  }, [leftConvertedValue]);

  useEffect(() => {
    if (rightConvertedValue >= 1 && rightFocus && !lockedPointers) {
      setLeftFocus(false);
      // Perform conversion calls
      startCurrencyConvert(rightCurrency, leftCurrency, rightConvertedValue);
    }
  }, [rightConvertedValue]);

  useEffect(() => {
    if (!convertedResult.success) {
      setLocked(false); // UnLock next calls
      return; // Return | Break if failed
    }
    setLocked(true); // Lock next calls
    if (leftFocus) {
      setRightConvertValue(convertedResult.result);
    } else if (rightFocus) {
      setLeftConvertValue(convertedResult.result);
    } else {
      setRightConvertValue(0);
      setLeftConvertValue(0);
    }
  }, [convertedResult]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Currency converter</Typography>
      <Typography variant="body1">
        Please enter the amount to convert on any field
      </Typography>
      {loading && <LinearProgress />}

      {error ||
        (convertError && (
          <Typography variant="body2" color="secondary">
            Something went wrong. Please try again!
          </Typography>
        ))}
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
                setLeftFocus(true);
                setLocked(false); // UnLock next calls
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
                setRightFocus(true);
                setLocked(false); // UnLock next calls
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
            getCountryByCode(option[0])[0]
              ? getCountryByCode(option[0])[0].name
              : '-'
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
  currValue: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // currency rates list
  list: makeSelectCurrencyList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

  // converted currency props
  convertedResult: makeSelectConvertData('convert'),
  convertLoading: makeSelectConvertLoading('convert'),
  convertError: makeSelectConvertError('convert'),
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
