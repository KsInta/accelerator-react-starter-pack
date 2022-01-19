import FooterComponent from '../footer-component/footer-component';
import HeaderComponent from '../header-component/header-component';
import GuitarCardsListComponent from '../guitar-cards-list-component/guitar-cards-list-component';
import GuitarsFilterComponent from '../guitars-filter-component/guitars-filter-component';
import GuitarsSortingComponent from '../guitars-sorting-component/guitars-sorting-component';
import PaginationComponent from '../pagination-component/pagination-component';

function MainScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <HeaderComponent />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <GuitarsFilterComponent />
            <GuitarsSortingComponent />
            <GuitarCardsListComponent />
            <PaginationComponent />
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default MainScreen;
