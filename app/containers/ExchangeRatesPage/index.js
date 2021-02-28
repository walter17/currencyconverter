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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export function ExchangeRatePage({ loading, error, list, loadList }) {
  const classes = useStyles();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [rates, setRates] = React.useState([]);

  useEffect(() => {
    console.log(list);
    if (rates.length === 0 && !loading) {
      // Load list if empty
      loadList();
      return;
    }
    setRates(list);
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
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
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
