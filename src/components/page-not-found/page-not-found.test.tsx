import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import PageNotFound from './page-not-found';
import userEvent from '@testing-library/user-event';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {...MockData},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

describe('Component: PageNotFound', () => {
    it('should render correctly', () => {
      render(
        <Provider store={store}>
          <Router history={history}>
            <PageNotFound />
          </Router>
        </Provider>);
  
      expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
      expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
    });

    it('should redirect to root url when user clicked to link', () => {
      history.push('/fake');
      render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/" exact>
                <h1>This is main page</h1>
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          </Router>
        </Provider>);
    
        expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
        userEvent.click(screen.getByText(/Вернуться на главную/i));
        expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
      });
  });