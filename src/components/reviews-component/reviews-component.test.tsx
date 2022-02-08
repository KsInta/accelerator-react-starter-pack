import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ReviewsComponent from './reviews-component';
import {GenerateFakeComment} from '../../mock/mock';

const history = createMemoryHistory();
const review = GenerateFakeComment();

describe('Component: GuitarCardComponent', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ReviewsComponent review={review}/>
      </Router>);

    expect(screen.getByText(review.advantage)).toBeInTheDocument();
    expect(screen.getByText(review.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});
