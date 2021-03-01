/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_RATELIST,
  LOAD_RATELIST_SUCCESS,
  LOAD_RATELIST_ERROR,
  CONVERT,
  CONVERT_SUCCESS,
  CONVERT_ERROR,
} from './constants';

/**
 * Load current currency exchange rates, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_RATELIST
 */
export function loadExchangeList() {
  return {
    type: LOAD_RATELIST,
  };
}

/**
 * Dispatched when the retrieving data succeeds
 *
 * @param  {array} list The exchange rates data
 *
 * @return {object} An action object with a type of LOAD_RATELIST_SUCCESS passing the list
 */
export function exchangeListSuccess(list) {
  return {
    type: LOAD_RATELIST_SUCCESS,
    list,
  };
}

/**
 * Dispatched when retrieving the list fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_RATELIST_ERROR passing the error
 */
export function exchangeListError(error) {
  return {
    type: LOAD_RATELIST_ERROR,
    error,
  };
}

/**
 * Triggered to process currency conversion, this action starts the request saga
 *
 * @return {object} An action object with a type of CONVERT
 */
export function sendToConvert(leftCurrency, rightCurrency, valueToConvert) {
  return {
    type: CONVERT,
    leftCurrency,
    rightCurrency,
    valueToConvert,
  };
}

/**
 * Dispatched when the convert process succeeds
 *
 * @return {object} An action object with a type of CONVERT_SUCCESS
 */
export function convertSuccess(info) {
  return {
    type: CONVERT_SUCCESS,
    info,
  };
}

/**
 * Dispatched when currency conversion fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CONVERT_ERROR passing the error
 */
export function convertFailed(error) {
  return {
    type: CONVERT_ERROR,
    error,
  };
}
