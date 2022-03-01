import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import FormSearchComponent from './form-search-component';
import userEvent from '@testing-library/user-event';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: FormSearchComponent', () => {
  it('should render FormSearchComponent and change search text', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FormSearchComponent />
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId('search'), 'Bass');
    expect(screen.getByDisplayValue(/Bass/i)).toBeInTheDocument();
  });
});
