import {ratingInStars} from '../../const';

type RatingProps = {
  rating: number,
}

function GuitarRating({rating}: RatingProps): JSX.Element {
  return(
    <>
      <span className="visually-hidden">Рейтинг:</span>
      {ratingInStars.map((star) => rating >= star ? <svg key={Math.random()} width="16" height="15" aria-hidden="true"><use xlinkHref="#icon-full-star"></use></svg> : <svg key={Math.random()} width="16" height="15" aria-hidden="true"><use xlinkHref="#icon-star"></use></svg>)}
    </>
  );
}

export default GuitarRating;
