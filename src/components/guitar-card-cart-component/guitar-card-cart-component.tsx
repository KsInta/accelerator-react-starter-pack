import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import ModalCartDeleteComponent from '../modal-cart-delete-component/modal-cart-delete-component';
import {changeGuitarsInCart} from '../../store/actions';
import {Guitar, GuitarsInCart} from '../../types/types';
import {GuitarTypesTranslationForProductPage} from '../../const';
import {saveGuitarsInCartInLocalStorage} from '../../services/guitars-in-cart';
import {MIN_GUITAR_COUNT_IN_CART, MAX_GUITAR_COUNT_IN_CART} from '../../const';

type GuitarCardCartComponentProps = {
  guitar: Guitar,
  guitarsInCart: GuitarsInCart,
}

function GuitarCardCartComponent({guitar, guitarsInCart}: GuitarCardCartComponentProps): JSX.Element {
  const {id, type, previewImg, name, vendorCode, stringCount, price} = guitar;
  const dispatch = useDispatch();
  const totalGuitarPrice = guitarsInCart[id] * price;
  const guitarsCartList: GuitarsInCart = Object.assign({}, guitarsInCart);
  const [count, setCount] = useState(guitarsInCart[id]);
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);

  const handleDeleteGuitarFromCartClick = () => {
    setIsModalCartOpen(true);
  };

  const handleDeleteGuitarFromCartCloseClick = () => {
    setIsModalCartOpen(false);
  };

  const handleDeleteGuitarFromCartListClick = () => {
    delete guitarsCartList[id];
    setIsModalCartOpen(false);
    dispatch(changeGuitarsInCart(guitarsCartList));
    saveGuitarsInCartInLocalStorage(guitarsCartList);
  };

  const handleGuitarCountChangeInput = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (+value < MIN_GUITAR_COUNT_IN_CART) {
      setCount(MIN_GUITAR_COUNT_IN_CART);
      guitarsCartList[id] = MIN_GUITAR_COUNT_IN_CART;
    } else if (+value > 0 && +value <= MAX_GUITAR_COUNT_IN_CART) {
      setCount(+value);
      guitarsCartList[id] = +value;
    } else if (+value > MAX_GUITAR_COUNT_IN_CART) {
      setCount(MAX_GUITAR_COUNT_IN_CART);
      guitarsCartList[id] = MAX_GUITAR_COUNT_IN_CART;
    }
    dispatch(changeGuitarsInCart(guitarsCartList));
    saveGuitarsInCartInLocalStorage(guitarsCartList);
  };

  const handleGuitarCountChangeMinus = () => {
    if (count === MIN_GUITAR_COUNT_IN_CART) {
      setIsModalCartOpen(true);
    } else if (count <= MAX_GUITAR_COUNT_IN_CART) {
      setCount(count - 1);
      guitarsCartList[id] = count - 1;
    }
    dispatch(changeGuitarsInCart(guitarsCartList));
    saveGuitarsInCartInLocalStorage(guitarsCartList);
  };

  const handleGuitarCountChangePlus = () => {
    if (count < MAX_GUITAR_COUNT_IN_CART) {
      setCount(count + 1);
      guitarsCartList[id] = count + 1;
    }
    dispatch(changeGuitarsInCart(guitarsCartList));
    saveGuitarsInCartInLocalStorage(guitarsCartList);
  };

  return(
    <>
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" onClick={handleDeleteGuitarFromCartClick} type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image"><img src={`/${previewImg}`} width="55" height="130" alt="ЭлектроГитара Честер bass" />
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{GuitarTypesTranslationForProductPage.get(type)} {name}</p>
          <p className="product-info__info">Артикул: {vendorCode}</p>
          <p className="product-info__info">{GuitarTypesTranslationForProductPage.get(type)}, {stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{price} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" onClick={handleGuitarCountChangeMinus} aria-label="Уменьшить количество">
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" value={count} onChange={handleGuitarCountChangeInput} />
          <button className="quantity__button" onClick={handleGuitarCountChangePlus} aria-label="Увеличить количество">
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{totalGuitarPrice} ₽</div>
      </div>
      {isModalCartOpen && <ModalCartDeleteComponent guitar={guitar} onModalCartDeleteCloseClick={handleDeleteGuitarFromCartCloseClick} onModalCartDeleteFromListClick={handleDeleteGuitarFromCartListClick}/>}
    </>
  );
}

export default GuitarCardCartComponent;
