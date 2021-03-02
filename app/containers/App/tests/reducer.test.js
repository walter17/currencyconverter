import produce from 'immer';

import appReducer from '../reducer';
import {
  loadExchangeList,
  exchangeListSuccess,
  exchangeListError,
  sendToConvert,
  convertSuccess,
  convertFailed,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      exchangeRateList: [],
      convert: {
        loading: false,
        error: false,
        data: false,
        leftCurrency: 0,
        rightCurrency: 0,
        valueToConvert: 0,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadExchangeList action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.exchangeRateList = [];
    });

    expect(appReducer(state, loadExchangeList())).toEqual(expectedResult);
  });

  it('should handle the exchangeListSuccess action correctly', () => {
    const rawList = [
      {
        code: 'USD',
        name: 'United States Dollar',
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.exchangeRateList = rawList;
      draft.loading = false;
      draft.error = false;
    });

    expect(appReducer(state, exchangeListSuccess(rawList))).toEqual(
      expectedResult,
    );
  });

  it('should handle the exchangeListError action correctly', () => {
    const rawError = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.error = rawError;
      draft.loading = false;
      draft.exchangeRateList = [];
    });

    expect(appReducer(state, exchangeListError(rawError))).toEqual(
      expectedResult,
    );
  });

  it('should trigger currency conversion action correctly', () => {
    const rawLeftCurrency = 'USD';
    const rawRightCurrency = 'EU';
    const rawValueToCurrency = 1;
    const expectedResult = produce(state, draft => {
      draft.convert.loading = true;
      draft.convert.error = false;
      draft.convert.data = false;
      draft.convert.leftCurrency = rawLeftCurrency;
      draft.convert.rightCurrency = rawRightCurrency;
      draft.convert.valueToConvert = rawValueToCurrency;
    });

    expect(
      appReducer(
        state,
        sendToConvert(rawLeftCurrency, rawRightCurrency, rawValueToCurrency),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the convertSuccess action correctly', () => {
    const rawInfo = [
      {
        rate: '1.82',
        success: true,
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.convert.data = rawInfo;
      draft.convert.loading = false;
      draft.convert.error = false;
    });

    expect(appReducer(state, convertSuccess(rawInfo))).toEqual(expectedResult);
  });

  it('should handle the convertFailed action correctly', () => {
    const rawError = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.convert.error = rawError;
      draft.convert.loading = false;
    });

    expect(appReducer(state, convertFailed(rawError))).toEqual(expectedResult);
  });
});
