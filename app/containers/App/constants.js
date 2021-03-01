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
export const LOAD_RATELIST = 'containers/App/LOAD_RATELIST';
export const LOAD_RATELIST_SUCCESS = 'containers/App/LOAD_RATELIST_SUCCESS';
export const LOAD_RATELIST_ERROR = 'containers/App/LOAD_RATELIST_ERROR';

// Constants --- Convert Currency
export const CONVERT = 'containers/App/CONVERT';
export const CONVERT_SUCCESS = 'containers/App/CONVERT_SUCCESS';
export const CONVERT_ERROR = 'containers/App/CONVERT_ERROR';

// API Constants
const CURRENCY_LIST_BASE_URL = `http://data.fixer.io/api/`;
export const CURRENCY_LIST_URI = `${CURRENCY_LIST_BASE_URL}latest`; // API to GET latest currency rate list
export const CONVERT_URI = `${CURRENCY_LIST_BASE_URL}convert`; // URI to process currency conversions
