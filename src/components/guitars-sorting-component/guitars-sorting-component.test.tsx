import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import GuitarSortingComponent from './guitars-sorting-component';
import {AppRoute, SortType, SortDirection} from '../../const';
import {ActionType} from '../../types/actions';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const fakeSorting = (
  <Provider store={store}>
    <Router history={history}>
      <GuitarSortingComponent />
    </Router>
  </Provider>
);

describe('Component: GuitarSortingComponent', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    render(fakeSorting);
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByText(/По цене/i)).toBeInTheDocument();
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('should dispatch changeSorting and changeSortingDirection', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeSorting);
    userEvent.click(screen.getByTestId('price'));
    expect(dispatch).toHaveBeenCalledWith({payload: SortType.Price, type: ActionType.ChangeSorting});
    userEvent.click(screen.getByTestId('rating'));
    expect(dispatch).toHaveBeenCalledWith({payload: SortType.Rating, type: ActionType.ChangeSorting});
    userEvent.click(screen.getByTestId('descension'));
    expect(dispatch).toHaveBeenCalledWith({payload: SortDirection.Descension, type: ActionType.ChangeSortingDirection});
  });
});

