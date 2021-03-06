import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ProductPage from './product-page';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeGuitar = GenerateFakeGuitar();

const store = mockStore({
  DATA: {...MockData, guitar: fakeGuitar, isGuitarLoaded: true},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductPage />
        </Router>
      </Provider>);

    expect(screen.getAllByText(fakeGuitar.name)).toHaveLength(3);
    expect(screen.getByText(fakeGuitar.description)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Добавить в корзину'})).toBeInTheDocument();
  });
});
