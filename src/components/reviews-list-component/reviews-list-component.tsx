import {useState} from 'react';
import {useSelector} from 'react-redux';
import ReviewsComponent from '../reviews-component/reviews-component';
import {REVIEWS_COUNT_STEP} from '../../const';
import {getGuitar} from '../../store/app-data/selectors';

type ReviewsListComponentProps = {
  onModalReviewBtnClick: () => void,
}

function ReviewsListComponent({onModalReviewBtnClick}: ReviewsListComponentProps): JSX.Element {
  const guitar = useSelector(getGuitar);
  const [reviewsStep, setReviewsStep] = useState<number>(REVIEWS_COUNT_STEP);
  const reviewsOnPage = guitar.comments.slice(0, reviewsStep);

  const isAllCommentsCountMoreThenVisibleComments = guitar.comments.length > reviewsStep;
  const isScrollBtnVisible = guitar.comments.length <= reviewsStep && guitar.comments.length !== 0;

  const handleLoadButton = () => {
    setReviewsStep(reviewsStep + REVIEWS_COUNT_STEP);
  };

  return(
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#review" onClick={onModalReviewBtnClick} tabIndex={0}>Оставить отзыв</a>
      {reviewsOnPage.map((comment) => <ReviewsComponent key={comment.id} review={comment} />)}
      {isAllCommentsCountMoreThenVisibleComments && <button className="button button--medium reviews__more-button" onClick={handleLoadButton}>Показать еще отзывы</button>}
      {isScrollBtnVisible && <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>}
    </section>
  );
}

export default ReviewsListComponent;
