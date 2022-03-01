import BreadcrumbsComponent from '../breadcrumbs-component/breadcrumbs-component';
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
          <BreadcrumbsComponent inCatalog>
          </BreadcrumbsComponent>
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
