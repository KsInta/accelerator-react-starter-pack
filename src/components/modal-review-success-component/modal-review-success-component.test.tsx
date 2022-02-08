import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalReviewSuccessComponent from './modal-review-success-component';

const history = createMemoryHistory();

describe('Component: ModalReviewSuccessComponent', () => {
  it('should render correctly', () => {
    const onModalReviewSuccessCloseClick = jest.fn();
    render(
      <Router history={history}>
        <ModalReviewSuccessComponent  onModalReviewSuccessCloseClick={onModalReviewSuccessCloseClick}/>
      </Router>);

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
  });
});
