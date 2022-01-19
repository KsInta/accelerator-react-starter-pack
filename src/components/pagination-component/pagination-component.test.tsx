import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import PaginationComponent from './pagination-component';
import {AppRoute} from '../../const';
import {ActionType} from '../../types/actions';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const GUITAR_COUNT = 25;

const mockStore = configureMockStore();

const fakeGuitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});

const store = mockStore({
  DATA: {...MockData, guitars: fakeGuitars},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const history = createMemoryHistory();

const fakePagination = (
  <Provider store={store}>
    <Router history={history}>
      <PaginationComponent />
    </Router>
  </Provider>
);

describe('Component: PaginationComponent', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    render(fakePagination);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveClass('pagination__list');
  });

  it('should dispatch changeActivePage', () => {
    const NEXT_PAGE = 2;
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakePagination);
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Далее/i));
    expect(dispatch).toHaveBeenCalledWith({payload: NEXT_PAGE, type: ActionType.ChangeActivePage});
  });
});