import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import ModalCartComponent from './modal-cart-component';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onModalCartCloseClick = jest.fn();
const onModalCartSuccessClick = jest.fn();
const fakeGuitar = GenerateFakeGuitar();

const store = mockStore({
  DATA: {...MockData, guitar: fakeGuitar},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const fakeCartComponent = (
  <Provider store={store}>
    <Router history={history}>
      <ModalCartComponent guitar={fakeGuitar} onModalCartCloseClick={onModalCartCloseClick} onModalCartSuccessClick={onModalCartSuccessClick} />
    </Router>
  </Provider>
);

describe('Component: ModalCartComponent', () => {
  it('should render correctly', () => {
    render(fakeCartComponent);

    expect(screen.getByRole('button', { name: 'Добавить в корзину'})).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
  it('should call dispatch when user add guitar in cart', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCartComponent);

    userEvent.click(screen.getByRole('button', {name: 'Добавить в корзину'}));
    expect(dispatch).toBeCalledTimes(1);
  });
});
