import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {postCouponAction} from '../../store/api-actions';
import {changeDiscount} from '../../store/actions';
import {getDiscount, getCouponPosted} from '../../store/app-data/selectors';

function CouponComponent(): JSX.Element {
  const discount = useSelector(getDiscount);
  const isCouponPosted = useSelector(getCouponPosted);
  const [coupon, setCoupon] = useState('');
  const [discountInCart] = useState(0);
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  let couponText;
  let couponClass;
  const submitBtn = !isCouponPosted ? <button className="button button--big coupon__button" disabled={isCouponPosted}>Применить</button> : <span className="button button--big coupon__button" style={{width: '100px', background: 'white', height: '40px', padding: 0}}><img src="/img/svg/coupon-loader.svg" style={{margin: '0 auto'}} width={36} alt="Loading"/></span>;

  if (isCouponValid === null) {
    couponText = '';
  } else if (!isCouponPosted) {
    if (discount !== 0) {
      couponText = 'Промокод принят';
      couponClass = 'form-input__message--success';
    } else {
      couponText = 'неверный промокод';
      couponClass = 'form-input__message--error';
    }
  }

  const handleCouponChange = ({target: {value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCoupon(value.toLocaleLowerCase());
  };

  const handleCouponChangeOnBlur = () => {
    setCoupon(coupon.replace(/ +/g, '').trim());
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const postedCoupon = {
      coupon,
    };

    dispatch(postCouponAction(postedCoupon));

    if (discount === 0) {
      setIsCouponValid(false);
    } else if (discount !== 0 ) {
      setIsCouponValid(true);
    }
  };

  useEffect(() => {
    dispatch(changeDiscount(discountInCart));
  }, [discountInCart]);

  return(
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" onSubmit={handleFormSubmit} id="coupon-form">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input onChange={handleCouponChange} onBlur={handleCouponChangeOnBlur} type="text" placeholder="Введите промокод" id="coupon" name="coupon" data-testid="coupon" value={coupon} autoComplete="off" />
          <p className={`form-input__message ${couponClass}`}>{couponText}</p>
        </div>
        {submitBtn}
      </form>
    </div>
  );
}

export default CouponComponent;
