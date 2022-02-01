import {useSelector, useDispatch} from 'react-redux';
import {SortType, SortDirection, getParams} from '../../const';
import {changeSorting, changeSortingDirection} from '../../store/actions';
import {getSortType, getSortDirtection} from '../../store/option-process/selectors';
import browserHistory from '../../browser-history';
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

function GuitarsSortingComponent(): JSX.Element {
  const sortType = useSelector(getSortType);
  const sortDirection = useSelector(getSortDirtection);
  const dispatch = useDispatch();

  const {search, pathname} = useLocation();

  const urlParams = new URLSearchParams(search);

  const sortTypeURL = urlParams.get(getParams.sort);
  const sortDirectionURL = urlParams.get(getParams.direction);

  const [sort] = useState(sortTypeURL);
  const [direction] = useState(sortDirectionURL);

  const handleChangeSortTypeByPrice = (type: SortType) => {
    dispatch(changeSorting(type));
    if (sortDirection === SortDirection.Default) {
      dispatch(changeSortingDirection(SortDirection.Ascension));
      urlParams.set(getParams.direction, SortDirection.Ascension);
    }
    urlParams.set(getParams.sort, type);
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleChangeSortTypeByRating = (type: SortType) => {
    dispatch(changeSorting(type));
    if (sortDirection === SortDirection.Default) {
      dispatch(changeSortingDirection(SortDirection.Ascension));
      urlParams.set(getParams.direction, SortDirection.Ascension);
    }
    urlParams.set(getParams.sort, type);
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleChangeSortDirectionByAsc = (type: SortDirection) => {
    if (sortType === SortType.Default) {
      dispatch(changeSorting(SortType.Price));
      urlParams.set(getParams.sort, SortType.Price);
    }
    dispatch(changeSortingDirection(type));
    urlParams.set(getParams.direction, type);
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleChangeSortDirectionByDesc = (type: SortDirection) => {
    if (sortType === SortType.Default) {
      dispatch(changeSorting(SortType.Price));
      urlParams.set(getParams.sort, SortType.Price);
    }
    dispatch(changeSortingDirection(SortDirection.Descension));
    urlParams.set(getParams.direction, type);
    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  useEffect(() => {
    if (sort === SortType.Price) {
      dispatch(changeSorting(SortType.Price));
    } else if (sort === SortType.Rating) {
      dispatch(changeSorting(SortType.Rating));
    }
  }, [sort]);

  useEffect(() => {
    if (direction === SortDirection.Ascension) {
      dispatch(changeSortingDirection(SortDirection.Ascension));
    } else if (direction === SortDirection.Descension) {
      dispatch(changeSortingDirection(SortDirection.Descension));
    }
  }, [direction]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${(sortType === SortType.Price)&&'catalog-sort__type-button--active'}`} aria-label="по цене" data-testid="price" onClick={()=>{handleChangeSortTypeByPrice(SortType.Price);}}>по цене
        </button>
        <button className={`catalog-sort__type-button ${(sortType === SortType.Rating)&&'catalog-sort__type-button--active'}`} aria-label="по популярности" data-testid="rating" onClick={()=>{handleChangeSortTypeByRating(SortType.Rating);}}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${(sortDirection === SortDirection.Ascension)&&'catalog-sort__order-button--active'}`} aria-label="По возрастанию" data-testid="ascension" onClick={()=>{handleChangeSortDirectionByAsc(SortDirection.Ascension);}}></button>
        <button className={`catalog-sort__order-button catalog-sort__order-button--down ${(sortDirection === SortDirection.Descension)&&'catalog-sort__order-button--active'}`} aria-label="По убыванию" data-testid="descension" onClick={()=>{handleChangeSortDirectionByDesc(SortDirection.Descension);}}></button>
      </div>
    </div>
  );
}

export default GuitarsSortingComponent;
