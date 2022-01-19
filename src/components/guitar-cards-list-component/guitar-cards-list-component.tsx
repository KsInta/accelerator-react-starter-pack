import {useSelector} from 'react-redux';
import GuitarCardComponent from '../guitar-card-component/guitar-card-component';
import {getSortedGuitarsByDirection} from '../../sorting';
import {MAX_GUITAR_COUNT_ON_PAGE} from '../../const';
import {getFilteredGuitarsByAllFilters} from '../../utils/utils';
import {getGuitars} from '../../store/app-data/selectors';
import {getSortType, getSortDirtection, getactivePage} from '../../store/option-process/selectors';
import {getMinPrice, getMaxPrice, getGuitarTypes, getGuitarStrings} from '../../store/filter-process/selectors';

function GuitarCardsListComponent(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const sortType = useSelector(getSortType);
  const sortDirection = useSelector(getSortDirtection);
  const activePage = useSelector(getactivePage);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const guitarTypes = useSelector(getGuitarTypes);
  const guitarStrings = useSelector(getGuitarStrings);

  let filteredGuitars = getFilteredGuitarsByAllFilters(guitars, minPrice, maxPrice, guitarTypes, guitarStrings);

  filteredGuitars = getSortedGuitarsByDirection(filteredGuitars, sortType, sortDirection);

  return (
    <div className="cards catalog__cards">
      {filteredGuitars.slice(activePage * MAX_GUITAR_COUNT_ON_PAGE - MAX_GUITAR_COUNT_ON_PAGE, activePage * MAX_GUITAR_COUNT_ON_PAGE).map((guitar) => <GuitarCardComponent key={guitar.id} guitar={guitar} />)}
    </div>
  );
}

export default GuitarCardsListComponent;
