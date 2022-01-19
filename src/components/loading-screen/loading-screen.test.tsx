import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LoadingScreen from './loading-screen';

const history = createMemoryHistory();

describe('Component: Logo', () => {
    it('should render correctly', () => {
      render(
        <Router history={history}>
          <LoadingScreen />
        </Router>);
  
      expect(screen.getByAltText(/Loading/i)).toBeInTheDocument();
    });
  });

