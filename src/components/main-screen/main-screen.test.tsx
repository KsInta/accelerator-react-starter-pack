import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MainScreen from './main-screen';
import {AppRoute} from '../../const';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <MainScreen />
    </Router>
  </Provider>
);

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });
});