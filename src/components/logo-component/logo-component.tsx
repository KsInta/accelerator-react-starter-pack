import {Link} from 'react-router-dom';

function LogoComponent(): JSX.Element {
  return (
    <Link className="header__logo logo" to="/">
      <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Guitar-shop" />
    </Link>
  );
}

export default LogoComponent;
