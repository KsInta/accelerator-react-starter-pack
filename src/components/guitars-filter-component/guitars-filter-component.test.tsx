import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import GuitarsFilterComponent from './guitars-filter-component';
import {AppRoute, StringCountByTypes} from '../../const';
import {ActionType} from '../../types/actions';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData, isDataLoaded: true},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const fakeFilter = (
  <Provider store={store}>
    <Router history={history}>
      <GuitarsFilterComponent />
    </Router>
  </Provider>
);

describe('Component: GuitarFilterComponent', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    render(fakeFilter);
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(7);
  });

  it('should change price and dispatch changeMinPrice', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);
    userEvent.type(screen.getByTestId('priceMin'), '1700');
    expect(screen.getByDisplayValue(/1700/i)).toBeInTheDocument();
    userEvent.click(document.body);
    expect(dispatch).toHaveBeenCalledWith({payload: 1700, type: ActionType.ChangeMinPrice});
  });

  it('should dispatch changeGuitarTypes and changeAvailableStringCount', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);
    userEvent.click(screen.getByTestId('acoustic'));
    expect(screen.getByTestId('acoustic')).not.toBeChecked();
    expect(dispatch).toHaveBeenCalledWith({payload: ['acoustic'], type: ActionType.ChangeGuitarTypes});
  });

  it('should dispatch changeGuitarStrings', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);
    userEvent.click(screen.getByTestId('7-strings'));
  });
});
