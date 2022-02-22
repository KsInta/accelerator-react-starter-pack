import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ModalCartDeleteComponent from './modal-cart-delete-component';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onModalCartDeleteCloseClick = jest.fn();
const onModalCartDeleteFromListClick = jest.fn();
const fakeGuitar = GenerateFakeGuitar();

const store = mockStore({
  DATA: {...MockData, guitar: fakeGuitar},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const fakeCartDeleteComponent = (
  <Provider store={store}>
    <Router history={history}>
      <ModalCartDeleteComponent guitar={fakeGuitar} onModalCartDeleteCloseClick={onModalCartDeleteCloseClick} onModalCartDeleteFromListClick={onModalCartDeleteFromListClick} />
    </Router>
  </Provider>
);

describe('Component: ModalCartDeleteComponent', () => {
  it('should render correctly', () => {
    render(fakeCartDeleteComponent);

    expect(screen.getByRole('button', { name: 'Удалить товар'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Продолжить покупки'})).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });
});
