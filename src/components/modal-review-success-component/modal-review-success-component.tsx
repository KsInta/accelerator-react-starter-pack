import {FocusOn} from 'react-focus-on';

type ModalReviewSuccessComponentProps = {
  onModalReviewSuccessCloseClick: () => void,
}

function ModalReviewSuccessComponent({onModalReviewSuccessCloseClick}: ModalReviewSuccessComponentProps): JSX.Element {
  return(
    <FocusOn onClickOutside={onModalReviewSuccessCloseClick} onEscapeKey={onModalReviewSuccessCloseClick}>
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Спасибо за ваш отзыв!</p>
        <div className="modal__button-container modal__button-container--review">
          <button className="button button--small modal__button modal__button--review" onClick={onModalReviewSuccessCloseClick}>К покупкам!</button>
        </div>
        <button className="modal__close-btn button-cross" type="button" onClick={onModalReviewSuccessCloseClick}aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
        </button>
      </div>
    </FocusOn>
  );
}

export default ModalReviewSuccessComponent;
