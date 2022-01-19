import {Link} from 'react-router-dom';
import FooterComponent from '../footer-component/footer-component';
import HeaderComponent from '../header-component/header-component';

function PageNotFound(): JSX.Element {
  return (
    <div className="wrapper">
      <HeaderComponent />
      <main>
        <div className="container" style={{textAlign: 'center'}}>
          <h1>
            404.
            <br />
            <small>Страница не найдена</small>
          </h1>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default PageNotFound;
