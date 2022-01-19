import {useSelector, useDispatch} from 'react-redux';
import {changeActivePage} from '../../store/actions';
import {getFilteredGuitarsByAllFilters, getPagesCount} from '../../utils/utils';
import {PAGE_STEP_CHANGE} from '../../const';
import {getGuitars} from '../../store/app-data/selectors';
import {getactivePage} from '../../store/option-process/selectors';
import {getMinPrice, getMaxPrice, getGuitarTypes, getGuitarStrings} from '../../store/filter-process/selectors';
import {useLocationField} from 'react-location-query';

function PaginationComponent(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const activePage = useSelector(getactivePage);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const guitarTypes = useSelector(getGuitarTypes);
  const guitarStrings = useSelector(getGuitarStrings);
  const dispatch = useDispatch();

  const [pagen, setPage] = useLocationField('page', activePage.toString());

  const handlePrevPageChange = () => {
    dispatch(changeActivePage(activePage - PAGE_STEP_CHANGE));
    setPage((activePage - PAGE_STEP_CHANGE).toString());
  };

  const handleNextPageChange = () => {
    dispatch(changeActivePage(activePage + PAGE_STEP_CHANGE));
    setPage((activePage + PAGE_STEP_CHANGE).toString());
  };

  const filteredGuitars = getFilteredGuitarsByAllFilters(guitars, minPrice, maxPrice, guitarTypes, guitarStrings);

  const pages = getPagesCount(filteredGuitars);

  return (
    <div className="pagination page-content__pagination">
      <span className="visually-hidden">{pagen}</span>
      <ul className="pagination__list">
        {activePage !== pages[0] ? <li className="pagination__page pagination__page--prev" id="prev"><a className="link pagination__page-link" onClick={handlePrevPageChange}>Назад</a></li> : ''}
        {pages.map((page) => <li key={page} className={`pagination__page ${(page === activePage)&&'pagination__page--active'}`}><a className="link pagination__page-link" onClick = {()=>{dispatch(changeActivePage(page));setPage(page.toString());}}>{page}</a></li>)}
        {activePage !== pages[pages.length - 1] ? <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" onClick={handleNextPageChange}>Далее</a></li> : ''}
      </ul>
    </div>
  );
}

export default PaginationComponent;
