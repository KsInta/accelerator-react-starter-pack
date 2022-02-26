import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {FocusOn} from 'react-focus-on';

type ModalCartSuccessComponentProps = {
  onModalCartSuccessCloseClick: () => void,
}

function ModalCartSuccessComponent({onModalCartSuccessCloseClick}: ModalCartSuccessComponentProps): JSX.Element {
  return(
    <FocusOn onClickOutside={onModalCartSuccessCloseClick} onEscapeKey={onModalCartSuccessCloseClick}>
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Товар успешно добавлен в корзину</p>
        <div className="modal__button-container modal__button-container--add">
          <Link className="button button--small modal__button" to={AppRoute.Cart}>Перейти в корзину</Link>
          <Link className="button button--black-border button--small modal__button modal__button--right" onClick={onModalCartSuccessCloseClick} to={AppRoute.Guitars}>Продолжить покупки</Link>
        </div>
        <button className="modal__close-btn button-cross" onClick={onModalCartSuccessCloseClick} type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
        </button>
      </div>
    </FocusOn>
  );
}

export default ModalCartSuccessComponent;
