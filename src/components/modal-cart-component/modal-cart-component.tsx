import {useSelector, useDispatch} from 'react-redux';
import {Guitar} from '../../types/types';
import styles from './modal-cart-component.module.css';
import {GuitarTypesTranslationForProductPage} from '../../const';
import {changeGuitarsInCart} from '../../store/actions';
import {getGuitarsInCart} from '../../store/app-data/selectors';
import {FocusOn} from 'react-focus-on';
import {saveGuitarsInCartInLocalStorage} from '../../services/guitars-in-cart';

type ModalCartComponentProps = {
  guitar: Guitar,
  onModalCartCloseClick: () => void,
  onModalCartSuccessClick: () => void,
}

function ModalCartComponent({guitar, onModalCartCloseClick, onModalCartSuccessClick}: ModalCartComponentProps): JSX.Element {
  const {id, name, vendorCode, price, type, stringCount, previewImg} = guitar;
  const guitarsInCart = useSelector(getGuitarsInCart);
  const dispatch = useDispatch();

  const handleChangeGuitarsInCart = () => {
    const inCart = Object.assign({}, guitarsInCart);
    const counter = !inCart[id] ? 0 : inCart[id];
    inCart[id] = counter + 1;
    dispatch(changeGuitarsInCart(inCart));
    onModalCartSuccessClick();
    saveGuitarsInCartInLocalStorage(inCart);
  };

  return(
    <div className={styles.container}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <FocusOn onClickOutside={onModalCartCloseClick} onEscapeKey={onModalCartCloseClick}>
            <div className="modal__content">
              <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
              <div className="modal__info"><img className="modal__img" style={{width: '67px', height: '137px'}} src={`/${previewImg}`} alt="Честер bass" />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                  <p className="modal__product-params">{GuitarTypesTranslationForProductPage.get(type)}, {stringCount} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--red button--big modal__button modal__button--add" onClick={handleChangeGuitarsInCart}>Добавить в корзину</button>
              </div>
              <button className="modal__close-btn button-cross" onClick={onModalCartCloseClick} type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </FocusOn>
        </div>
      </div>
    </div>
  );
}

export default ModalCartComponent;
