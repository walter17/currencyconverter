import {
  LOAD_RATELIST,
  LOAD_RATELIST_SUCCESS,
  LOAD_RATELIST_ERROR,
  CONVERT,
  CONVERT_SUCCESS,
  CONVERT_ERROR,
} from '../constants';

import {
  loadExchangeList,
  exchangeListSuccess,
  exchangeListError,
  sendToConvert,
  convertSuccess,
  convertFailed,
} from '../actions';

describe('App Actions', () => {
  describe('loadExchangeList', () => {
    it('should return currency rates', () => {
      const expectedResult = {
        type: LOAD_RATELIST,
      };

      expect(loadExchangeList()).toEqual(expectedResult);
    });
  });

  describe('exchangeListSuccess', () => {
    it('should return the currency rate list', () => {
      const rawList = ['Test'];
      const expectedResult = {
        type: LOAD_RATELIST_SUCCESS,
        list: rawList,
      };

      expect(exchangeListSuccess(rawList)).toEqual(expectedResult);
    });
  });

  describe('exchangeListError', () => {
    it('should return error messages and data', () => {
      const errorRaw = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_RATELIST_ERROR,
        error: errorRaw,
      };
      expect(exchangeListError(errorRaw)).toEqual(expectedResult);
    });
  });

  describe('sendToConvert', () => {
    it('should trigger selected currency conversion', () => {
      const rawLeftCurrency = 'USD';
      const rawRightCurrency = 'EU';
      const rawValueToCurrency = 1;
      const expectedResult = {
        type: CONVERT,
        leftCurrency: rawLeftCurrency,
        rightCurrency: rawRightCurrency,
        valueToConvert: rawValueToCurrency,
      };

      expect(
        sendToConvert(rawLeftCurrency, rawRightCurrency, rawValueToCurrency),
      ).toEqual(expectedResult);
    });
  });

  describe('convertSuccess', () => {
    it('should return conversion info on success', () => {
      const rawInfo = ['Test'];
      const expectedResult = {
        type: CONVERT_SUCCESS,
        info: rawInfo,
      };
      expect(convertSuccess(rawInfo)).toEqual(expectedResult);
    });
  });

  describe('convertFailed', () => {
    it('should return error messages and data, when conversion fails', () => {
      const errorRaw = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: CONVERT_ERROR,
        error: errorRaw,
      };
      expect(convertFailed(errorRaw)).toEqual(expectedResult);
    });
  });
});
