/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// Constants --- Retrieve Exhange Rate List
export const LOAD_RATELIST = 'containers/ExchangeRates/LOAD_RATELIST';
export const LOAD_RATELIST_SUCCESS =
  'containers/ExchangeRates/LOAD_RATELIST_SUCCESS';
export const LOAD_RATELIST_ERROR =
  'containers/ExchangeRates/LOAD_RATELIST_ERROR';

// API Constants
const API_BASE_URL = `http://data.fixer.io/api/`;
export const CURRENCY_LIST_URI = `${API_BASE_URL}latest`; // API to GET latest currency rate list
export const CONVERT_URI = `${API_BASE_URL}convert`; // URI to process currency conversions
