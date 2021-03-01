/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_RATELIST,
  LOAD_RATELIST_SUCCESS,
  LOAD_RATELIST_ERROR,
  CONVERT,
  CONVERT_SUCCESS,
  CONVERT_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
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

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_RATELIST:
        draft.loading = true;
        draft.error = false;
        draft.exchangeRateList = [];
        break;

      case LOAD_RATELIST_SUCCESS:
        draft.exchangeRateList = action.list;
        draft.loading = false;
        draft.error = false;
        break;

      case LOAD_RATELIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.exchangeRateList = [];
        break;

      case CONVERT:
        draft.convert.loading = true;
        draft.convert.error = false;
        draft.convert.data = false;
        draft.convert.leftCurrency = action.leftCurrency;
        draft.convert.rightCurrency = action.rightCurrency;
        draft.convert.valueToConvert = action.valueToConvert;
        break;

      case CONVERT_SUCCESS:
        draft.convert.data = action.info;
        draft.convert.loading = false;
        draft.convert.error = false;
        break;

      case CONVERT_ERROR:
        draft.convert.error = action.error;
        draft.convert.loading = false;
        break;
    }
  });

export default appReducer;
