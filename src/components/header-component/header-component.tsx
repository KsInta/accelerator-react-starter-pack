import FormSearchComponent from '../form-search-component/form-search-component';
import LogoComponent from '../logo-component/logo-component';
import {Link} from 'react-router-dom';

function HeaderComponent() {
  return (
    <header className="header" id="header" style={{position: 'relative', zIndex: 2}}>
      <div className="container header__wrapper">
        <LogoComponent />
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href="#">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
            <Link to="/guitars?name=modus-create">Modus Create</Link>
          </ul>
        </nav>
        <FormSearchComponent />
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default HeaderComponent;
