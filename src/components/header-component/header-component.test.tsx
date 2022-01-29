import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HeaderComponent from './header-component';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: HeaderComponent', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderComponent />
        </Router>
      </Provider>);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
