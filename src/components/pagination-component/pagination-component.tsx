import {useSelector, useDispatch} from 'react-redux';
import {changeActivePage} from '../../store/actions';
import {getFilteredGuitarsByAllFilters, getPagesCount} from '../../utils/utils';
import {PAGE_STEP_CHANGE, getParams} from '../../const';
import {getGuitars} from '../../store/app-data/selectors';
import {getActivePage} from '../../store/option-process/selectors';
import {getMinPrice, getMaxPrice, getGuitarTypes, getGuitarStrings} from '../../store/filter-process/selectors';
import browserHistory from '../../browser-history';
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

function PaginationComponent(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const activePage = useSelector(getActivePage);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const guitarTypes = useSelector(getGuitarTypes);
  const guitarStrings = useSelector(getGuitarStrings);
  const dispatch = useDispatch();

  const {search, pathname} = useLocation();

  const urlParams = new URLSearchParams(search);

  const activePageURL = urlParams.get(getParams.page) ? Number(urlParams.get(getParams.page)) : activePage;

  const [activePageFromURL] = useState(activePageURL);

  const filteredGuitars = getFilteredGuitarsByAllFilters(guitars, minPrice, maxPrice, guitarTypes, guitarStrings);

  const pages = getPagesCount(filteredGuitars);

  const isActivePageIsNotFirst = activePage !== pages[0] && pages.length !== 0;
  const isActivePageIsNotLast = activePage !== pages[pages.length - 1] && pages.length !== 0;

  const handlePrevPageChange = () => {
    dispatch(changeActivePage(activePage - PAGE_STEP_CHANGE));
    urlParams.set(getParams.page, (activePage - PAGE_STEP_CHANGE).toString());
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleNextPageChange = () => {
    dispatch(changeActivePage(activePage + PAGE_STEP_CHANGE));
    urlParams.set(getParams.page, (activePage + PAGE_STEP_CHANGE).toString());
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleActivePageChange = (page: number) => {
    dispatch(changeActivePage(page));
    urlParams.set(getParams.page, page.toString());
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  useEffect(() => {
    if (activePageFromURL > pages[pages.length - 1]) {
      dispatch(changeActivePage(activePage));
      urlParams.set(getParams.page, activePage.toString());
      browserHistory.push({
        pathname: pathname,
        search: urlParams.toString(),
      });
    } else {
      dispatch(changeActivePage(activePageFromURL));
    }
  }, [activePageFromURL]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isActivePageIsNotFirst && <li className="pagination__page pagination__page--prev" id="prev"><a className="link pagination__page-link" href="#top" onClick={handlePrevPageChange}>Назад</a></li>}
        {pages.map((page) =>
          <li key={page} className={`pagination__page ${(page === activePage)&&'pagination__page--active'}`}><a className="link pagination__page-link" href="#top" onClick = {()=>{handleActivePageChange(page);}}>{page}</a></li>)}
        {isActivePageIsNotLast && <li className="pagination__page pagination__page--next" id="next" data-test={pages.length}><a className="link pagination__page-link" href="#top"onClick={handleNextPageChange}>Далее</a></li>}
      </ul>
    </div>
  );
}

export default PaginationComponent;
