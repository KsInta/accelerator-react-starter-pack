import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import GuitarCardComponent from './guitar-card-component';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const guitar = GenerateFakeGuitar();
const guitarsInCart = {
  3: 2,
  6: 3,
};

const store = mockStore({
  DATA: {...MockData, guitarsInCart},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: GuitarCardComponent', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCardComponent guitar={guitar}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
