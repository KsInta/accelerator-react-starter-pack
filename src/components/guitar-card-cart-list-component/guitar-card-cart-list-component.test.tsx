import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import GuitarCardCartListComponent from './guitar-card-cart-list-component';
import {AppRoute} from '../../const';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const GUITAR_COUNT = 3;
const guitarsInCart = {
  3: 2,
  6: 3,
  8: 3,
};

const fakeGuitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});

const storeMore = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: GuitarCardCartListComponent', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    render(
      <Provider store={storeMore}>
        <Router history={history}>
          <GuitarCardCartListComponent guitarsInCartList={fakeGuitars} guitarsInCart={guitarsInCart} />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Артикул/i)).toHaveLength(GUITAR_COUNT);
    expect(screen.getAllByText(/струнная/i)).toHaveLength(GUITAR_COUNT);
  });
});
