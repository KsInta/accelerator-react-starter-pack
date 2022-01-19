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

describe('Component: GuitarSortingComponent', () => {
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
    userEvent.type(screen.getByTestId('priceMin'), '17000');
    expect(screen.getByDisplayValue(/17000/i)).toBeInTheDocument();
    userEvent.click(document.body);
    expect(dispatch).toHaveBeenCalledWith({payload: 17000, type: ActionType.ChangeMinPrice});
  });

  it('should dispatch changeGuitarTypes and changeAvailableStringCount', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);
    userEvent.click(screen.getByTestId('acoustic'));
    expect(screen.getByTestId('acoustic')).toBeChecked();
    expect(dispatch).toHaveBeenCalledWith({payload: ['acoustic'], type: ActionType.ChangeGuitarTypes});
    expect(dispatch).toHaveBeenCalledWith({payload: StringCountByTypes.acoustic, type: ActionType.ChangeAvailableStringCount});
  });

  it('should dispatch changeGuitarStrings', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);
    userEvent.click(screen.getByTestId('7-strings'));
    expect(dispatch).toHaveBeenCalledWith({payload: [7], type: ActionType.ChangeGuitarStrings});
  });
});
