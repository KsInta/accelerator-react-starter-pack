import {Link} from 'react-router-dom';
import GuitarRating from '../guitar-rating/guitar-rating';
import {AppRoute} from '../../const';
import {Guitar} from '../../types/types';

type GuitarComponentProps = {
  guitar: Guitar,
};

function GuitarCardComponent({guitar}: GuitarComponentProps): JSX.Element {

  const {id, name, previewImg, rating, comments, price} = guitar;

  return (
    <div className="product-card"><img src={`/${previewImg}`} width="75" height="190" alt="СURT Z30 Plus Acoustics" />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <GuitarRating rating={rating} />
          <span className="rate__count">{comments.length}</span>
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
