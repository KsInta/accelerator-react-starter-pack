import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import GuitarRating from '../guitar-rating/guitar-rating';
import ModalCartComponent from '../modal-cart-component/modal-cart-component';
import ModalCartSuccessComponent from '../modal-cart-success-component/modal-cart-success-component';
import {AppRoute} from '../../const';
import {Guitar} from '../../types/types';
import {getGuitarsInCart} from '../../store/app-data/selectors';

type GuitarComponentProps = {
  guitar: Guitar,
};

function GuitarCardComponent({guitar}: GuitarComponentProps): JSX.Element {
  const {id, name, previewImg, rating, comments, price} = guitar;
  const guitarsInCart = useSelector(getGuitarsInCart);
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);
  const [isModalCartSuccessOpen, setIsModalCartSuccessOpen] = useState(false);
  const buyBtnClass = guitarsInCart[id] ? 'button--red-border button--in-cart' : 'button--red button--add-to-cart';
  const buyBtnText = guitarsInCart[id] ? 'В корзине' : 'Купить';
  const buyBtnRedirect = guitarsInCart[id] ? `${AppRoute.Cart}` : `#${id}`;

  const isModalVisible = isModalCartOpen || isModalCartSuccessOpen;
  let className = '';

  if (isModalCartSuccessOpen) {
    className = 'modal--success';
  }

  const handleModalCartOpenClick = () => {
    setIsModalCartOpen(true);
  };

  const handleModalCartCloseClick = () => {
    setIsModalCartOpen(false);
  };

  const handleModalCartSuccessClick = () => {
    setIsModalCartOpen(false);
    setIsModalCartSuccessOpen(true);
  };

  const handleModalSuccessCloseClick = () => {
    setIsModalCartSuccessOpen(false);
  };

  return (
    <>
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
          <Link className={`button button--mini ${buyBtnClass}`} onClick={handleModalCartOpenClick} to={buyBtnRedirect}>{buyBtnText}</Link>
        </div>
      </div>
      {isModalVisible &&
      <div style={{position: 'absolute'}}>
        <div className={`modal is-active modal-for-ui-kit ${className}`}>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            {isModalCartOpen && <ModalCartComponent guitar={guitar} onModalCartCloseClick={handleModalCartCloseClick} onModalCartSuccessClick={handleModalCartSuccessClick} />}
            {isModalCartSuccessOpen && <ModalCartSuccessComponent onModalCartSuccessCloseClick={handleModalSuccessCloseClick} />}
          </div>
        </div>
      </div>}
    </>
  );
}

export default GuitarCardComponent;
