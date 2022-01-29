import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FooterComponent from './footer-component';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <FooterComponent />
      </Router>);

    expect(screen.getByText(/Магазин гитар, музыкальных инструментов/i)).toBeInTheDocument();
    expect(screen.getByText(/Все инструменты проверены, отстроены/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы/i)).toBeInTheDocument();
  });
});
