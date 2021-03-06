import {Guitar} from '../../types/types';
import {GuitarTypesTranslationForProductPage} from '../../const';
import {FocusOn} from 'react-focus-on';

type ModalCartDeleteComponentProps = {
  guitar: Guitar,
  onModalCartDeleteCloseClick: () => void,
  onModalCartDeleteFromListClick: () => void,
}

function ModalCartDeleteComponent({guitar, onModalCartDeleteCloseClick, onModalCartDeleteFromListClick}: ModalCartDeleteComponentProps): JSX.Element {
  const {previewImg, name, vendorCode, type, stringCount, price} = guitar;

  return(
    <FocusOn onClickOutside={onModalCartDeleteCloseClick} onEscapeKey={onModalCartDeleteCloseClick}>
      <div className="modal__content">
        <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
        <div className="modal__info"><img className="modal__img" src={previewImg} width="67" height="137" alt="Честер bass" />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
            <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
            <p className="modal__product-params">{GuitarTypesTranslationForProductPage.get(type)}, {stringCount} струнная</p>
            <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
          </div>
        </div>
        <div className="modal__button-container">
          <button className="button button--small modal__button" onClick={onModalCartDeleteFromListClick}>Удалить товар</button>
          <button className="button button--black-border button--small modal__button modal__button--right" onClick={onModalCartDeleteCloseClick}>Продолжить покупки</button>
        </div>
        <button className="modal__close-btn button-cross" onClick={onModalCartDeleteCloseClick} type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
        </button>
      </div>
    </FocusOn>
  );
}

export default ModalCartDeleteComponent;
