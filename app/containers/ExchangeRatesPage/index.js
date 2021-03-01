/**
 * Exchange Page File
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Common Dependencies

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectCurrencyList,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadExchangeList } from 'containers/App/actions';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import reducer from './reducer';
import saga from './saga';
// import { FormattedMessage } from 'react-intl';

// import H1 from 'components/H1';

const key = 'exchangerates';

// Styles
const useStyles = makeStyles({
  container: {
    maxHeight: 500,
  },
  table: {
    minWidth: 650,
  },
});

// Currency names arr, that is not part of the api response values
function getCountryByCode(code) {
  const currNamesArr = [
    {
      code: 'AED',
      name: 'United Arab Emirates Dirham',
    },
    { code: 'AFN', name: 'Afghan afghani' },
    { code: 'ALL', name: 'Albania Lek' },
    { code: 'AMD', name: 'Armenian dram' },
    { code: 'ANG', name: 'Netherlands Antillean guilder' },
    { code: 'AOA', name: 'Angolan kwanza' },
    { code: 'ARS', name: 'Argentine peso' },
    { code: 'AUD', name: 'Australian dollar' },
    { code: 'AWG', name: 'Aruban florin' },
    { code: 'AZN', name: 'Azerbaijani manat' },
    { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Marka' },
    { code: 'BBD', name: 'Barbados Dollar' },
    { code: 'BDT', name: 'Bangladeshi taka' },
    { code: 'BGN', name: 'Bulgarian lev' },
    { code: 'BHD', name: 'Bahraini dinar' },
    { code: 'BIF', name: 'Burundian franc' },
    { code: 'BMD', name: 'Bermuda Dollar' },
    { code: 'BND', name: 'Brunei dollar' },
    { code: 'BOB', name: 'Bolivian Boliviano' },
    { code: 'BRL', name: 'Brazilian real' },
    { code: 'BSD', name: 'Bahamian dollar' },
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'BTN', name: 'Bhutanese ngultrum' },
    { code: 'BWP', name: 'Botswana pula' },
    { code: 'BYN', name: 'Belarusian ruble' },
    { code: 'BYR', name: 'Belarusian ruble' },
    { code: 'BZD', name: 'Belize dollar' },
    { code: 'CAD', name: 'Canadian dollar' },
    { code: 'CDF', name: 'Congolese franc' },
    { code: 'CHF', name: 'Swiss franc' },
    { code: 'CLF', name: 'Chilean Unit of Account' },
    { code: 'CLP', name: 'Chilean Peso' },
    { code: 'CNY', name: 'Chinese yuan renminbi' },
    { code: 'COP', name: 'Colombian peso' },
    { code: 'CRC', name: 'Costa Rican Colón' },
    { code: 'CUC', name: 'Cuban Convertible Peso' },
    { code: 'CUP', name: 'Cuban Peso' },
    { code: 'CVE', name: 'Cape Verdean Escudo' },
    { code: 'CZK', name: 'Czech Koruna' },
    { code: 'DJF', name: 'Djiboutian Franc' },
    { code: 'DKK', name: 'Danish krone' },
    { code: 'DOP', name: 'Dominican Peso' },
    { code: 'DZD', name: 'Algerian Dinar' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'ERN', name: 'Eritrean nakfa' },
    { code: 'ETB', name: 'Ethiopian Birr' },
    { code: 'EUR', name: 'Euro' },
    { code: 'FJD', name: 'Fijian Dollar' },
    { code: 'FKP', name: 'Falkland Islands Pound' },
    { code: 'GBP', name: 'British pound sterling' },
    { code: 'GEL', name: 'Georgian lari' },
    { code: 'GGP', name: 'Guernsey pound' },
    { code: 'GHS', name: 'Ghanaian cedi' },
    { code: 'GIP', name: 'Gibraltar pound' },
    { code: 'GMD', name: 'Gambian dalasi' },
    { code: 'GNF', name: 'Guinean Franc' },
    { code: 'GTQ', name: 'Guatemalan Quetzal' },
    { code: 'GYD', name: 'Guyanaese Dollar' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'HNL', name: 'Honduran Lempira' },
    { code: 'HRK', name: 'Croatian Kuna' },
    { code: 'HTG', name: 'Haitian Gourde' },
    { code: 'HUF', name: 'Hungarian forint' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'ILS', name: 'Israeli New Shekel' },
    { code: 'IMP', name: 'Manx pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'IQD', name: 'Iraqi dinar' },
    { code: 'IRR', name: 'Iranian Rial' },
    { code: 'ISK', name: 'Icelandic krona' },
    { code: 'JEP', name: 'Jersey pound' },
    { code: 'JMD', name: 'Jamaican Dollar' },
    { code: 'JOD', name: 'Jordanian Dinar' },
    { code: 'JPY', name: 'Japanese yen' },
    { code: 'KES', name: 'Kenyan shilling' },
    { code: 'KGS', name: 'Kyrgystani Som' },
    { code: 'KHR', name: 'Cambodian riel' },
    { code: 'KMF', name: 'Comorian franc' },
    { code: 'KPW', name: 'North Korean won' },
    { code: 'KRW', name: 'South Korean won' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'KYD', name: 'Cayman Islands Dollar' },
    { code: 'KZT', name: 'Kazakhstani Tenge' },
    { code: 'LAK', name: 'Laotian Kip' },
    { code: 'LBP', name: 'Lebanese pound' },
    { code: 'LKR', name: 'Sri Lankan Rupee' },
    { code: 'LRD', name: 'Liberian Dollar' },
    { code: 'LSL', name: 'Lesotho loti' },
    { code: 'LTL', name: 'Lithuanian litas' },
    { code: 'LVL', name: 'Latvian lats' },
    { code: 'LYD', name: 'Libyan Dinar' },
    { code: 'MAD', name: 'Moroccan Dirham' },
    { code: 'MDL', name: 'Moldovan Leu' },
    { code: 'MGA', name: 'Malagasy Ariary' },
    { code: 'MKD', name: 'Macedonian Denar' },
    { code: 'MMK', name: 'Myanmar kyat' },
    { code: 'MNT', name: 'Mongolian tögrög' },
    { code: 'MOP', name: 'Macau pataca' },
    { code: 'MRO', name: 'Mauritanian ouguiya' },
    { code: 'MUR', name: 'Mauritian rupee' },
    { code: 'MVR', name: 'Maldivian rufiyaa' },
    { code: 'MWK', name: 'Malawian Kwacha' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'MZN', name: 'Mozambican metical' },
    { code: 'NAD', name: 'Namibian dollar' },
    { code: 'NGN', name: 'Nigerian naira' },
    { code: 'NIO', name: 'Nicaraguan Córdoba' },
    { code: 'NOK', name: 'Norwegian krone' },
    { code: 'NPR', name: 'Nepalese rupee' },
    { code: 'NZD', name: 'New Zealand dollar' },
    { code: 'OMR', name: 'Omani rial' },
    { code: 'PAB', name: 'Panamanian Balboa' },
    { code: 'PEN', name: 'Peruvian Sol' },
    { code: 'PGK', name: 'Papua New Guinea' },
    { code: 'PHP', name: 'Philippine peso' },
    { code: 'PKR', name: 'Pakistani rupee' },
    { code: 'PLN', name: 'Polish złoty' },
    { code: 'PYG', name: 'Paraguayan guaraní' },
    { code: 'QAR', name: 'Paraguayan guaraní' },
    { code: 'RON', name: 'Romanian leu' },
    { code: 'RSD', name: 'Serbian dinar' },
    { code: 'RUB', name: 'Russian ruble' },
    { code: 'RWF', name: 'Rwandan franc' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'SBD', name: 'Solomon Islands Dollar' },
    { code: 'SCR', name: 'Seychellois Rupee' },
    { code: 'SDG', name: 'Sudanese pound' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'SGD', name: 'Singapore dollar' },
    { code: 'SHP', name: 'Saint Helena pound' },
    { code: 'SLL', name: 'Sierra Leonean Leone' },
    { code: 'SOS', name: 'Somali Shilling' },
    { code: 'SRD', name: 'Surinamese Dollar' },
    { code: 'STD', name: 'São Tomé and Príncipe dobra' },
    { code: 'SVC', name: 'Salvadoran colón' },
    { code: 'SYP', name: 'Syrian pound' },
    { code: 'SZL', name: 'Swazi Lilangeni' },
    { code: 'THB', name: 'Thai baht' },
    { code: 'TJS', name: 'Tajikistani Somoni' },
    { code: 'TMT', name: 'Turkmenistan manat' },
    { code: 'TND', name: 'Tunisian dinar' },
    { code: 'TOP', name: "Tonga Pa'anga" },
    { code: 'TRY', name: 'Turkish lira' },
    { code: 'TTD', name: 'Trinidad and Tobago dollar' },
    { code: 'TWD', name: 'New Taiwan dollar' },
    { code: 'TZS', name: 'Tanzanian Shilling' },
    { code: 'UAH', name: 'Ukrainian hryvnia' },
    { code: 'UGX', name: 'Ugandan Shilling' },
    { code: 'USD', name: 'United States Dollar' },
    { code: 'UYU', name: 'Uruguayan Peso' },
    { code: 'UZS', name: 'Uzbekistani Som' },
    { code: 'VEF', name: 'Venezuelan bolivar' },
    { code: 'VND', name: 'Vietnamese dong' },
    { code: 'VUV', name: 'Vanuatu vatu' },
    { code: 'WST', name: 'Samoan tālā' },
    { code: 'XAF', name: 'Central African CFA franc' },
    { code: 'XAG', name: 'Silver Ounce' },
    { code: 'XAU', name: 'Gold' },
    { code: 'XCD', name: 'Eastern Caribbean dollar' },
    { code: 'XDR', name: 'Special Drawing Rights' },
    { code: 'XOF', name: 'West African CFA franc' },
    { code: 'XPF', name: 'CFP franc' },
    { code: 'YER', name: 'Yemeni Rial' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'ZMK', name: 'Zambian Kwacha' },
    { code: 'ZMW', name: 'Zambian kwacha' },
    { code: 'ZWL', name: 'Zimbabwean dollar' },
  ];
  return currNamesArr.filter(data => data.code === code);
}

export function ExchangeRatePage({ loading, error, list, loadList }) {
  const classes = useStyles();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [rates, setRates] = React.useState([]);
  const [loadingRates, setLoading] = React.useState(false);

  useEffect(() => {
    if (list.length === 0 && !loadingRates) {
      setLoading(true);
      // Load list if empty
      loadList();
      return;
    }
    setRates(Object.keys(list).map(keyItem => [keyItem, list[keyItem]]));
  }, [list]);

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper} className={classes.container}>
        {/* Loading indicator */}
        {loading && <LinearProgress />}

        {/* Error label */}
        {error && (
          <Typography variant="h6" align="center" color="secondary">
            Something went wrong. Please try again!
          </Typography>
        )}
        {/* No Result label */}
        {rates.length === 0 && (
          <Typography variant="h6" align="center">
            No Item Found.
          </Typography>
        )}

        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead elevation={4}>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="center">Currency Name</TableCell>
              <TableCell align="right">Exchange Rate = 1 EURO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Show results handler */}
            {rates.length > 0 &&
              rates.map(row => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="center">
                    {getCountryByCode(row[0])[0].name}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                </TableRow>
              ))}

            {/* No Result handler */}
            {rates.length === 0 && (
              <TableRow>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

ExchangeRatePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  list: PropTypes.any,
  loadList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  list: makeSelectCurrencyList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadList: () => {
      dispatch(loadExchangeList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExchangeRatePage);
