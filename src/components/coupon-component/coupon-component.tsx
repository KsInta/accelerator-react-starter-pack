import {useState, ChangeEvent, FormEvent} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {postCouponAction} from '../../store/api-actions';
import {changeDiscount} from '../../store/actions';
import {getCouponPosted} from '../../store/app-data/selectors';
import {coupons} from '../../const';

function CouponComponent(): JSX.Element {
  const isCouponPosted = useSelector(getCouponPosted);
  const [coupon, setCoupon] = useState('');
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  let couponText;
  const couponClass = isCouponValid ? 'form-input__message--success' : 'form-input__message--error';
  const submitBtn = !isCouponPosted ? <button className="button button--big coupon__button" disabled={isCouponPosted}>Применить</button> : <span className="button button--big coupon__button" style={{width: '100px', background: 'white', height: '40px', padding: 0}}><img src="/img/svg/coupon-loader.svg" style={{margin: '0 auto'}} width={36} alt="Loading"/></span>;

  if (isCouponValid === null) {
    couponText = '';
  } else if (isCouponValid && !isCouponPosted) {
    couponText = 'Промокод принят';
  } else if (!isCouponValid && coupon !== '') {
    couponText = 'неверный промокод';
  }

  const handleCouponChange = ({target: {value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCoupon(value);
  };

  const handleCouponChangeOnBlur = () => {
    setCoupon(coupon.replace(/ +/g, '').trim());
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const postedCoupon = {
      coupon,
    };
    let isCouponChecked = false;
    coupons.map((item) => {
      if (item === coupon) {
        postedCoupon.coupon = coupon;
        dispatch(postCouponAction(postedCoupon));
        setIsCouponValid(true);
        isCouponChecked = true;
      }
    });

    if (!isCouponChecked) {
      dispatch(changeDiscount(0));
      setIsCouponValid(false);
    }
  };

  return(
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" onSubmit={handleFormSubmit} id="coupon-form">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input onChange={handleCouponChange} onBlur={handleCouponChangeOnBlur} type="text" placeholder="Введите промокод" id="coupon" name="coupon" data-testid="coupon" value={coupon}/>
          <p className={`form-input__message ${couponClass}`}>{couponText}</p>
        </div>
        {submitBtn}
      </form>
    </div>
  );
}

export default CouponComponent;
