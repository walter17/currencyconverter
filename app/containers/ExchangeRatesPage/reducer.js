/*
 * Exchange Rates Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * ---------------------------------------------------------
 * Author: John Walter Ramos
 * Last Modified: 02/28/2021
 */

import produce from 'immer';
import {
  LOAD_RATELIST,
  LOAD_RATELIST_ERROR,
  LOAD_RATELIST_SUCCESS,
} from 'containers/App/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exchangeRateList: [],
};

/* eslint-disable default-case, no-param-reassign */
const exchangeRateReducer = (state = initialState, action) =>
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
    }
  });

export default exchangeRateReducer;
