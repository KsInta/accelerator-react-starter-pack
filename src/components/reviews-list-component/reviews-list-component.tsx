import {useState} from 'react';
import {useSelector} from 'react-redux';
import ReviewsComponent from '../reviews-component/reviews-component';
import {REVIEWS_COUNT_STEP} from '../../const';
import {getGuitarComments} from '../../store/app-data/selectors';

type ReviewsListComponentProps = {
  onModalReviewBtnClick: () => void,
}

function ReviewsListComponent({onModalReviewBtnClick}: ReviewsListComponentProps): JSX.Element {
  const guitarComments = useSelector(getGuitarComments);
  const [reviewsStep, setReviewsStep] = useState<number>(REVIEWS_COUNT_STEP);
  const reviewsOnPage = guitarComments.slice(0, reviewsStep);

  const handleLoadButton = () => {
    setReviewsStep(reviewsStep + REVIEWS_COUNT_STEP);
  };

  return(
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" onClick={onModalReviewBtnClick} tabIndex={0}>Оставить отзыв</a>
      {reviewsOnPage.map((comment) => <ReviewsComponent key={comment.id} review={comment} />)}
      {guitarComments.length > reviewsStep ? <button className="button button--medium reviews__more-button" onClick={handleLoadButton}>Показать еще отзывы</button> : ''}
      {guitarComments.length <= reviewsStep && guitarComments.length !== 0 ? <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a> : ''}
    </section>
  );
}

export default ReviewsListComponent;
