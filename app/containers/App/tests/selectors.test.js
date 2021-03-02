import {
  selectGlobal,
  makeSelectCurrencyList,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectConvertLoading,
  makeSelectConvertError,
  makeSelectConvertValue,
  makeSelectLeftCurrency,
  makeSelectRightCurrency,
  makeSelectConvertData,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectCurrencyList', () => {
  const rateListSelector = makeSelectCurrencyList();
  it('should select the repos', () => {
    const rawList = [];
    const mockedState = {
      global: {
        exchangeRateList: [],
      },
    };
    expect(rateListSelector(mockedState)).toEqual(rawList);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});

describe('makeSelectConvertLoading', () => {
  const convertLoadingSelector = makeSelectConvertLoading();
  it('should select conversion loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        convert: {
          loading,
        },
      },
    };
    expect(convertLoadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectConvertError', () => {
  const errorConvertSelector = makeSelectConvertError('convert');
  it('should select the error', () => {
    expect(errorConvertSelector(404)).toEqual(false);
  });
});

describe('makeSelectConvertValue', () => {
  const convertValueSelector = makeSelectConvertValue('convert');
  it('should select the error', () => {
    expect(convertValueSelector(0)).toEqual(0);
  });
});

describe('makeSelectLeftCurrency', () => {
  const leftCurrencySelector = makeSelectLeftCurrency('convert');
  it('should select the error', () => {
    expect(leftCurrencySelector('USD')).toEqual(0);
  });
});

describe('makeSelectRightCurrency', () => {
  const rightCurrencySelector = makeSelectRightCurrency('convert');
  it('should select the error', () => {
    expect(rightCurrencySelector('EU')).toEqual(0);
  });
});

describe('makeSelectConvertData', () => {
  const dataConvertedSelector = makeSelectConvertData('convert');
  it('should select the error', () => {
    expect(dataConvertedSelector(false)).toEqual(false);
  });
});
