import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import FormSearchComponent from '../form-search-component/form-search-component';
import LogoComponent from '../logo-component/logo-component';
import {getGuitarsInCart} from '../../store/app-data/selectors';
import {AppRoute} from '../../const';

function HeaderComponent() {
  const guitarsInCart = useSelector(getGuitarsInCart);
  const guitarsCount = Object.values(guitarsInCart).reduce((acc, count) => acc + count, 0);

  return (
    <header className="header" id="header" style={{position: 'relative', zIndex: 2}}>
      <div className="container header__wrapper">
        <LogoComponent />
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link" to={AppRoute.Guitars}>Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <FormSearchComponent />
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {guitarsCount !== 0 && <span className="header__cart-count">{guitarsCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default HeaderComponent;
