import {Link} from 'react-router-dom';
import {AppRoute, ratingInStars} from '../../const';
import {Guitar} from '../../types/types';

type GuitarComponentProps = {
  guitar: Guitar,
};

function GuitarCardComponent({guitar}: GuitarComponentProps): JSX.Element {

  const {id, name, previewImg, rating, price} = guitar;

  return (
    <div className="product-card"><img src={`/${previewImg}`} width="75" height="190" alt="СURT Z30 Plus Acoustics" />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {ratingInStars.map((star) => rating >= star ? <svg key={Math.random()} width="15" height="15" aria-hidden="true"><use xlinkHref="#icon-full-star"></use></svg> : <svg key={Math.random()} width="16" height="15" aria-hidden="true"><use xlinkHref="#icon-star"></use></svg>)}
          <span className="rate__count">{rating}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Guitars}/${id}`}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCardComponent;
