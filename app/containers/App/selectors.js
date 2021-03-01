/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrencyList = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.exchangeRateList,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectConvertLoading = () =>
  createSelector(
    selectRouter,
    globalState => globalState.convert.loading,
  );

const makeSelectConvertError = () =>
  createSelector(
    selectRouter,
    globalState => globalState.convert.error,
  );

const makeSelectConvertValue = () =>
  createSelector(
    selectRouter,
    globalState => globalState.convert.valueToConvert,
  );

const makeSelectLeftCurrency = () =>
  createSelector(
    selectRouter,
    globalState => globalState.convert.leftCurrency,
  );

const makeSelectRightCurrency = () =>
  createSelector(
    selectRouter,
    globalState => globalState.convert.rightCurrency,
  );

const makeSelectConvertData = () =>
  createSelector(
    selectRouter,
    globalState => globalState.convert.data,
  );

export {
  selectGlobal,
  makeSelectCurrencyList,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectConvertLoading,
  makeSelectConvertError,
  makeSelectConvertValue,
  makeSelectLeftCurrency,
  makeSelectRightCurrency,
  makeSelectConvertData,
};
