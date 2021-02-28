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
import { useInjectSaga } from 'utils/injectSaga';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import reducer from './reducer';
import saga from './saga';
// import { FormattedMessage } from 'react-intl';

// import H1 from 'components/H1';

const key = 'exchangerates';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function ExchangeRatePage({ loading, error, list, loadList }) {
  const classes = useStyles();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [rates, setRates] = React.useState([]);
  const [loadingRates, setLoading] = React.useState(false);

  useEffect(() => {
    if (list.length === 0 && !loadingRates) {
      setLoading(true);
      // Load list if empty
      loadList();
      return;
    }
    // console.log(list);
    setRates(Object.keys(list).map(keyItem => [keyItem, list[keyItem]]));
  }, [list]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Currency Name</TableCell>
              <TableCell align="right">Exchange Rate = 1 USD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.length > 0 &&
              rates.map(row => (
                <TableRow key={row[1]}>
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">{row}</TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                </TableRow>
              ))}
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
