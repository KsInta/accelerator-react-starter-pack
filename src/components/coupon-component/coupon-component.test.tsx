import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CouponComponent from './coupon-component';
import userEvent from '@testing-library/user-event';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: CouponComponent', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CouponComponent />
        </Router>
      </Provider>);

    expect(screen.getByText(/Введите свой промокод/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Применить'})).toBeInTheDocument();
    userEvent.type(screen.getByTestId('coupon'), 'light-333');
    expect(screen.getByDisplayValue(/light-333/i)).toBeInTheDocument();
  });
});
