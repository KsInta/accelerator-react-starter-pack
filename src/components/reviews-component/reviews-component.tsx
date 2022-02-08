import GuitarRating from '../guitar-rating/guitar-rating';
import {Comment} from '../../types/types';

type ReviewsComponentProps = {
  review: Comment,
}

function ReviewsComponent({review}: ReviewsComponentProps): JSX.Element {
  const {userName, advantage, disadvantage, comment, rating, createAt} = review;

  return(
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{(new Date(createAt).toLocaleString('ru-RU', {day: 'numeric', month: 'long'}))}</span>
      </div>
      <GuitarRating rating={rating} />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default ReviewsComponent;
