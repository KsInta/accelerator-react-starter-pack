import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalCartSuccessComponent from './modal-cart-success-component';

const history = createMemoryHistory();

describe('Component: ModalCartSuccessComponent', () => {
  it('should render correctly', () => {
    const onModalCartSuccessCloseClick = jest.fn();
    render(
      <Router history={history}>
        <ModalCartSuccessComponent  onModalCartSuccessCloseClick={onModalCartSuccessCloseClick}/>
      </Router>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Перейти в корзину'})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Продолжить покупки'})).toBeInTheDocument();
  });
});
