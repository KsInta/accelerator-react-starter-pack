import {useSelector, useDispatch} from 'react-redux';
import {SortType, SortDirection} from '../../const';
import {changeSorting, changeSortingDirection} from '../../store/actions';
import {getSortType, getSortDirtection} from '../../store/option-process/selectors';

function GuitarsSortingComponent(): JSX.Element {
  const sortType = useSelector(getSortType);
  const sortDirection = useSelector(getSortDirtection);
  const dispatch = useDispatch();

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${(sortType === SortType.Price)&&'catalog-sort__type-button--active'}`} aria-label="по цене" tabIndex={-1} data-testid="price" onClick={
          ()=>{
            dispatch(changeSorting(SortType.Price));
            if (sortDirection === SortDirection.Default) {
              dispatch(changeSortingDirection(SortDirection.Ascension));
            }
          }
        }
        >по цене
        </button>
        <button className={`catalog-sort__type-button ${(sortType === SortType.Rating)&&'catalog-sort__type-button--active'}`} aria-label="по популярности" data-testid="rating" onClick={
          ()=>{
            dispatch(changeSorting(SortType.Rating));
            if (sortDirection === SortDirection.Default) {
              dispatch(changeSortingDirection(SortDirection.Ascension));
            }
          }
        }
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${(sortDirection === SortDirection.Ascension)&&'catalog-sort__order-button--active'}`} aria-label="По возрастанию" data-testid="ascension" tabIndex={-1} onClick={
          ()=>{
            if (sortType === SortType.Default) {
              dispatch(changeSorting(SortType.Price));
            }
            dispatch(changeSortingDirection(SortDirection.Ascension));
          }
        }
        >
        </button>
        <button className={`catalog-sort__order-button catalog-sort__order-button--down ${(sortDirection === SortDirection.Descension)&&'catalog-sort__order-button--active'}`} aria-label="По убыванию" data-testid="descension"
          onClick={
            ()=>{
              if (sortType === SortType.Default) {
                dispatch(changeSorting(SortType.Price));
              }
              dispatch(changeSortingDirection(SortDirection.Descension));
            }
          }
        >
        </button>
      </div>
    </div>
  );
}

export default GuitarsSortingComponent;
