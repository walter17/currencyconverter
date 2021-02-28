/**
 * Redux Saga
 * API Request handler for Currency Exchange Rates
 * -----------------------------------------------
 * Author: Walter Ramos
 * Last Modified: 02/28/2021
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_RATELIST, CURRENCY_LIST_URI } from 'containers/App/constants';
import { exchangeListSuccess, exchangeListError } from 'containers/App/actions';
import request from 'utils/request';

// Retrieve currency exchange rates
export function* getCurrencyList() {
  // Construct API headers
  const requestURL = `${CURRENCY_LIST_URI}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const list = yield call(request, requestURL, headers);
    yield put(exchangeListSuccess(list));
  } catch (err) {
    yield put(exchangeListError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* currencyListData() {
  // Watches for LOAD_RATELIST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_RATELIST, getCurrencyList);
}
