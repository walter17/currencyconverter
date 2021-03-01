/**
 * Exchange Page File
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Common Dependencies
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectCurrencyList,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadExchangeList } from 'containers/App/actions';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCountryByCode } from 'containers/App/commons';
import reducer from 'containers/App/reducer';
// import { FormattedMessage } from 'react-intl';

const key = 'exchangerates';

// Styles
const useStyles = makeStyles({
  container: {
    maxHeight: 500,
  },
  table: {
    minWidth: 650,
  },
});

export function ExchangeRatePage({ loading, error, list, loadList }) {
  const classes = useStyles();

  useInjectReducer({ key, reducer });

  const [rates, setRates] = React.useState([]);
  const [loadingRates, setLoading] = React.useState(false);

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
      <TableContainer component={Paper} className={classes.container}>
        {/* Loading indicator */}
        {loading && <LinearProgress />}

        {/* Error label */}
        {error && (
          <Typography variant="h6" align="center" color="secondary">
            Something went wrong. Please try again!
          </Typography>
        )}
        {/* No Result label */}
        {rates.length === 0 && (
          <Typography variant="h6" align="center">
            No Item Found.
          </Typography>
        )}

        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead elevation={4}>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="center">Currency Name</TableCell>
              <TableCell align="right">Exchange Rate = 1 USD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Show results handler */}
            {rates.length > 0 &&
              rates.map(row => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="center">
                    {getCountryByCode(row[0])[0]
                      ? getCountryByCode(row[0])[0].name
                      : '-'}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                </TableRow>
              ))}

            {/* No Result handler */}
            {rates.length === 0 && (
              <TableRow>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

ExchangeRatePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  list: PropTypes.any,
  loadList: PropTypes.func,
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
)(ExchangeRatePage);
