import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LogoComponent from './logo-component';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: LogoComponent', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <LogoComponent />
      </Router>);

    expect(screen.getByAltText(/Guitar-shop/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <LogoComponent />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
