import {useSelector} from 'react-redux';
import BreadcrumbsComponent from '../breadcrumbs-component/breadcrumbs-component';
import CartTotalComponent from '../cart-total-component/cart-total-component';
import CouponComponent from '../coupon-component/coupon-component';
import FooterComponent from '../footer-component/footer-component';
import HeaderComponent from '../header-component/header-component';
import GuitarCardCartListComponent from '../guitar-card-cart-list-component/guitar-card-cart-list-component';
import {getGuitars, getGuitarsInCart, getDiscount} from '../../store/app-data/selectors';
import {Guitar} from '../../types/types';

function CartPage(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const guitarsInCart = useSelector(getGuitarsInCart);
  const discount = useSelector(getDiscount);
  const guitarsInCartList: Guitar[] = [];
  let totalPrice = 0;

  Object.keys(guitarsInCart).map((item) => {
    if (Object.prototype.hasOwnProperty.call(guitars, item)) {
      guitarsInCartList.push(guitars[+item]);
    }
  });

  guitarsInCartList.map((guitar) => {
    totalPrice += guitar.price * guitarsInCart[guitar.id];
  });

  return(
    <div className="wrapper">
      <HeaderComponent />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <BreadcrumbsComponent inCatalog={false}>
            <li className="breadcrumbs__item">
              <a className="link">Корзина</a>
            </li>
          </BreadcrumbsComponent>
          <div className="cart">
            <GuitarCardCartListComponent guitarsInCartList={guitarsInCartList} guitarsInCart={guitarsInCart}/>
            <div className="cart__footer">
              <CouponComponent />
              <CartTotalComponent totalPrice={totalPrice} discount={discount} />
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default CartPage;
