import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import configureStore from '../../../configureStore';
import ConverterPage from '../index';

describe('<ConverterPage />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a Converter Page Component', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ConverterPage
              setCurrencyType={() => {}}
              loading={false}
              error={false}
              list={[]}
              loadList={() => {}}
              startCurrencyConvert={() => {}}
              convertedResult={[]}
              convertLoading={false}
              convertError={false}
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
