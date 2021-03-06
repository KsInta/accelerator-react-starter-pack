import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import GuitarCardsListComponent from './guitar-cards-list-component';
import {AppRoute} from '../../const';
import {Guitar, GuitarsBranch} from '../../types/types';
import {GenerateFakeGuitar, MIN_PRICE, MAX_PRICE} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const GUITAR_COUNT_MORE_THEN_ONE_PAGE = 25;
const GUITAR_COUNT_LESS_THEN_ONE_PAGE = 6;
const GUITAR_COUNT_ON_PAGE = 9;

const history = createMemoryHistory();
const mockStore = configureMockStore();

const fakeGuitarsMore = new Array(GUITAR_COUNT_MORE_THEN_ONE_PAGE).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});
const normalizedDataMore = fakeGuitarsMore.reduce<GuitarsBranch>((acc, item: Guitar) => {
  acc[item.id] = item;
  return acc;
}, {});
const fakeGuitarsLess = new Array(GUITAR_COUNT_LESS_THEN_ONE_PAGE).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});
const normalizedDataLess = fakeGuitarsLess.reduce<GuitarsBranch>((acc, item: Guitar) => {
  acc[item.id] = item;
  return acc;
}, {});

const storeMore = mockStore({
  DATA: {...MockData, guitars: normalizedDataMore},
  OPTION: {...MockOption},
  FILTER: {...MockFilter, minPrice: MIN_PRICE, maxPrice: MAX_PRICE},
});

const storeLess = mockStore({
  DATA: {...MockData, guitars: normalizedDataLess},
  OPTION: {...MockOption},
  FILTER: {...MockFilter, minPrice: MIN_PRICE, maxPrice: MAX_PRICE},
});

describe('Component: GuitarCardsListComponent', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly with guitars more then GUITAR_COUNT_ON_PAGE', () => {
    render(
      <Provider store={storeMore}>
        <Router history={history}>
          <GuitarCardsListComponent />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/??????????????/i)).toHaveLength(GUITAR_COUNT_ON_PAGE);
    expect(screen.getAllByText(/??????????????????/i)).toHaveLength(GUITAR_COUNT_ON_PAGE);
    expect(screen.getAllByText(/????????????/i)).toHaveLength(GUITAR_COUNT_ON_PAGE);
  });

  it('should render correctly with guitars less then GUITAR_COUNT_ON_PAGE', () => {
    render(
      <Provider store={storeLess}>
        <Router history={history}>
          <GuitarCardsListComponent />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/??????????????/i)).toHaveLength(GUITAR_COUNT_LESS_THEN_ONE_PAGE);
    expect(screen.getAllByText(/??????????????????/i)).toHaveLength(GUITAR_COUNT_LESS_THEN_ONE_PAGE);
    expect(screen.getAllByText(/????????????/i)).toHaveLength(GUITAR_COUNT_LESS_THEN_ONE_PAGE);
  });
});
