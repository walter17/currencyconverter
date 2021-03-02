/**
 * Currency Converter Page Unit Testing Saga Coverage
 */
import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_RATELIST, CONVERT } from 'containers/App/constants';
import {
  exchangeListSuccess,
  exchangeListError,
  convertSuccess,
  convertFailed,
} from 'containers/App/actions';

import currencyListData, { getCurrencyList, convertCurrency } from '../saga';

describe('Retrieve currency exchange rates Saga', () => {
  let getGenerator;

  beforeEach(() => {
    getGenerator = currencyListData();

    const selectDescriptor = getGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the exchangeListSuccess action when rates list retrieved successfully', () => {
    const response = [{ success: true }];
    expect({
      '@@redux-saga/IO': true,
      combinator: false,
      payload: {
        action: {
          list: response,
          type: 'containers/App/LOAD_RATELIST_SUCCESS',
        },
        channel: undefined,
      },
      type: 'PUT',
    }).toEqual(put(exchangeListSuccess(response)));
  });

  it('should call the exchangeListError action rates retreival fails', () => {
    const response = new Error('Some error');

    expect({
      '@@redux-saga/IO': true,
      combinator: false,
      payload: {
        action: {
          error: new Error('Some error'),
          type: 'containers/App/LOAD_RATELIST_ERROR',
        },
        channel: undefined,
      },
      type: 'PUT',
    }).toEqual(put(exchangeListError(response)));
  });

  it('should dispatch the convertSuccess action when converted successfully', () => {
    const response = [{ success: true }];
    expect({
      '@@redux-saga/IO': true,
      combinator: false,
      payload: {
        action: {
          info: response,
          type: 'containers/App/CONVERT_SUCCESS',
        },
        channel: undefined,
      },
      type: 'PUT',
    }).toEqual(put(convertSuccess(response)));
  });

  it('should call the convertFailed action if device login fails', () => {
    const response = new Error('Some error');

    expect({
      '@@redux-saga/IO': true,
      combinator: false,
      payload: {
        action: {
          error: new Error('Some error'),
          type: 'containers/App/CONVERT_ERROR',
        },
        channel: undefined,
      },
      type: 'PUT',
    }).toEqual(put(convertFailed(response)));
  });

  describe('currencyListData Saga', () => {
    const currencySaga = currencyListData();

    it('should start task to watch for LOAD_RATELIST action', () => {
      const takeLatestDescriptor = currencySaga.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(LOAD_RATELIST, getCurrencyList),
      );
    });

    it('should start task to watch for CONVERT action', () => {
      const takeLatestDescriptor = currencySaga.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(CONVERT, convertCurrency),
      );
    });
  });
});
