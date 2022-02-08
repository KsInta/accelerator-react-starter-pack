import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import GuitarRating from './guitar-rating';

const history = createMemoryHistory();
const GUITAR_RATING = 4;

describe('Component: EmptyList', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <GuitarRating rating={GUITAR_RATING} />
      </Router>);

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
  });
});
