/**
 * Redux Saga
 * API Request handler for Currency Exchange Rates
 * -----------------------------------------------
 * Author: Walter Ramos
 * Last Modified: 02/28/2021
 */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  LOAD_RATELIST,
  CURRENCY_LIST_URI,
  CONVERT,
  CONVERT_URI,
} from 'containers/App/constants';
import {
  exchangeListSuccess,
  exchangeListError,
  convertSuccess,
  convertFailed,
} from 'containers/App/actions';

import {
  makeSelectConvertValue,
  makeSelectLeftCurrency,
  makeSelectRightCurrency,
} from 'containers/App/selectors';
import request from 'utils/request';

// Retrieve currency exchange rates
export function* getCurrencyList() {
  // Construct API headers
  const requestURL = `${CURRENCY_LIST_URI}?access_key=252f4905adac6f1633d32f17b8b6cba0&base=USD`;
  try {
    // Call our request helper (see 'utils/request')
    const results = yield call(request, requestURL);
    if (results.success) {
      yield put(exchangeListSuccess(results.rates));
    } else {
      yield put(exchangeListError(results));
    }
  } catch (err) {
    yield put(exchangeListError(err));
  }
}

// Process currency conversion
export function* convertCurrency() {
  // Retrieve
  const lCurrency = yield select(makeSelectLeftCurrency('convert'));
  const rCurrency = yield select(makeSelectRightCurrency('convert'));
  const convertVal = yield select(makeSelectConvertValue('convert'));

  // Construct API headers
  const requestURL = `${CONVERT_URI}?access_key=252f4905adac6f1633d32f17b8b6cba0&from=${lCurrency}&to=${rCurrency}&amount=${convertVal}`;
  try {
    // Call our request helper (see 'utils/request')
    const results = yield call(request, requestURL);
    if (results.success) {
      yield put(convertSuccess(results));
    } else {
      yield put(convertFailed(results));
    }
  } catch (err) {
    yield put(convertFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* currencyListData() {
  // Watches for LOAD_RATELIST, CONVERT actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_RATELIST, getCurrencyList);
  yield takeLatest(CONVERT, convertCurrency);
}
