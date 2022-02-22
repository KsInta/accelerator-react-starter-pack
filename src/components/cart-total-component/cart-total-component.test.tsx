import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CartTotalComponent from './cart-total-component';

const history = createMemoryHistory();
const totalPrice = 100000;
const discount = 25;

describe('Component: CartTotalComponent', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CartTotalComponent totalPrice={totalPrice} discount={discount} />
      </Router>);

    expect(screen.getByText(/100000/i)).toBeInTheDocument();
    expect(screen.getByText(/25000/i)).toBeInTheDocument();
    expect(screen.getByText(/75000/i)).toBeInTheDocument();
  });
});
