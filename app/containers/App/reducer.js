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
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  list: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_RATELIST:
        draft.loading = true;
        draft.error = false;
        draft.list = [];
        break;

      case LOAD_RATELIST_SUCCESS:
        draft.list = action.list;
        draft.loading = false;
        draft.error = false;
        break;

      case LOAD_RATELIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.list = [];
        break;
    }
  });

export default appReducer;
