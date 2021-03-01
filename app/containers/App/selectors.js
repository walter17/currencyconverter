/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

export const objReduxConv = typeVal => {
  if (typeVal === 'convert') return true;

  return false;
};

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

const makeSelectConvertLoading = itemQuery =>
  createSelector(
    selectGlobal,
    globalState =>
      objReduxConv(itemQuery) ? globalState[itemQuery].loading : false,
  );

const makeSelectConvertError = itemQuery =>
  createSelector(
    selectGlobal,
    globalState =>
      objReduxConv(itemQuery) ? globalState[itemQuery].error : false,
  );

const makeSelectConvertValue = itemQuery =>
  createSelector(
    selectGlobal,
    globalState =>
      objReduxConv(itemQuery) ? globalState[itemQuery].valueToConvert : false,
  );

const makeSelectLeftCurrency = itemQuery =>
  createSelector(
    selectGlobal,
    globalState =>
      objReduxConv(itemQuery) ? globalState[itemQuery].leftCurrency : false,
  );

const makeSelectRightCurrency = itemQuery =>
  createSelector(
    selectGlobal,
    globalState =>
      objReduxConv(itemQuery) ? globalState[itemQuery].rightCurrency : false,
  );

const makeSelectConvertData = itemQuery =>
  createSelector(
    selectGlobal,
    globalState =>
      objReduxConv(itemQuery) ? globalState[itemQuery].data : false,
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
