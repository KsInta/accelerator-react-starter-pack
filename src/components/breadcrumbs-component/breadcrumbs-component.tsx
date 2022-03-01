import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type BreadcrumbsComponentProps = {
  children: ReactNode,
  inCatalog: boolean,
}

function BreadcrumbsComponent({children, inCatalog}: BreadcrumbsComponentProps): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        {inCatalog ? <a className="link">Каталог</a> : <Link className="link" to={AppRoute.Guitars}>Каталог</Link>}
      </li>
      {children}
    </ul>
  );
}

export default BreadcrumbsComponent;
