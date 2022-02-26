import React, {ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postCommentAction} from '../../store/api-actions';
import {getGuitar, getCommentPosted} from '../../store/app-data/selectors';
import {RatingStar} from '../../const';
import {FocusOn} from 'react-focus-on';

type ModalReviewComponentProps = {
  onModalReviewCloseClick: () => void,
}

function ModalReviewComponent({onModalReviewCloseClick}: ModalReviewComponentProps): JSX.Element {
  const guitar = useSelector(getGuitar);
  const isCommentPosted = useSelector(getCommentPosted);
  const dispatch = useDispatch();
  const textLength = 3;

  const [formState, setFormState] = useState({
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: '',
  });

  const isUserNameNotFilled = formState.userName.length < textLength;
  const isAdvantageNotFilled = formState.advantage.length < textLength;
  const isDisdvantageNotFilled = formState.disadvantage.length < textLength;
  const isCommentNotFilled = formState.comment.length < textLength;
  const isRatingNotChoosen = formState.rating === '';

  const isPostBtnDisabled = formState.rating === '' || formState.userName.length < textLength || formState.advantage.length < textLength || formState.disadvantage.length < textLength || formState.comment.length < textLength;

  const postedComment = {
    userName: formState.userName,
    advantage: formState.advantage,
    disadvantage: formState.disadvantage,
    comment: formState.comment,
    rating: +formState.rating,
    guitarId: guitar.id,
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction(guitar.id, postedComment));
  };

  const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isCommentPosted) {
      setFormState({
        userName: '',
        advantage: '',
        disadvantage: '',
        comment: '',
        rating: '',
      });
    }
  }, [isCommentPosted]);

  return(
    <FocusOn onClickOutside={onModalReviewCloseClick} onEscapeKey={onModalReviewCloseClick}>
      <div className="modal__content">
        <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
        <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
        <form className="form-review" onSubmit={handleFormSubmit}>
          <div className="form-review__wrapper">
            <div className="form-review__name-wrapper">
              <label className="form-review__label form-review__label--required" htmlFor="userName">Ваше Имя</label>
              <input className="form-review__input form-review__input--name" id="userName" name="userName" data-testid="userName" onChange={handleChange} type="text" autoComplete="off" />
              {isUserNameNotFilled && <span className="form-review__warning">Заполните поле</span>}
            </div>
            <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
              <div className="rate rate--reverse">
                {RatingStar.map(({score, titleName}) => (
                  <React.Fragment key={score}>
                    <input className="visually-hidden"
                      name="rating"
                      value={score}
                      id={`${score}-stars`}
                      data-testid={`${score}-stars`}
                      type="radio"
                      onChange={handleChange}
                      checked={formState.rating === String(score)}
                    />
                    <label htmlFor={`${score}-stars`} className="rate__label" title={titleName}>
                    </label>
                  </React.Fragment>
                ))}
                {isRatingNotChoosen &&  <span className="rate__message">Поставьте оценку</span>}
              </div>
            </div>
          </div>
          <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
          <input className="form-review__input" id="advantage" name="advantage" data-testid="advantage" onChange={handleChange} type="text" autoComplete="off" />
          {isAdvantageNotFilled && <span className="form-review__warning">Заполните поле</span>}
          <label className="form-review__label form-review__label--required" htmlFor="disadvantage">Недостатки</label>
          <input className="form-review__input" id="disadvantage" name="disadvantage" data-testid="disadvantage" onChange={handleChange} type="text" autoComplete="off" />
          {isDisdvantageNotFilled && <span className="form-review__warning">Заполните поле</span>}
          <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
          <textarea className="form-review__input form-review__input--textarea" id="comment" name="comment" data-testid="comment" onChange={handleChange} rows={10} autoComplete="off"></textarea>
          {isCommentNotFilled && <span className="form-review__warning">Заполните поле</span>}
          <button className="button button--medium-20 form-review__button" type="submit" disabled={isPostBtnDisabled}>Отправить отзыв</button>
        </form>
        <button className="modal__close-btn button-cross" onClick={onModalReviewCloseClick} type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
        </button>
      </div>
    </FocusOn>
  );
}

export default ModalReviewComponent;
