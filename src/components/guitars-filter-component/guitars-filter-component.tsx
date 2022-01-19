import {useSelector, useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import {changeActivePage, changeMinPrice, changeMaxPrice, changeGuitarTypes, changeGuitarStrings, changeAvailableStringCount} from '../../store/actions';
import {comparePrice} from '../../sorting';
import {FIRST_PAGE, GuitarTypesTranslation, StringCountByTypes, allGuitarTypes, availableStringCountByTypes} from '../../const';
import {getAvailableStringCount} from '../../utils/utils';
import {getDataLoaded, getGuitars} from '../../store/app-data/selectors';
import {getMinPrice, getMaxPrice, getGuitarTypes, getGuitarStrings, getAvailableGuitarStringCount} from '../../store/filter-process/selectors';

function GuitarsFilterComponent(): JSX.Element {
  const isDataLoaded = useSelector(getDataLoaded);
  const guitars = useSelector(getGuitars);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const guitarTypes = useSelector(getGuitarTypes);
  const guitarStrings = useSelector(getGuitarStrings);
  const availableStringCount = useSelector(getAvailableGuitarStringCount);
  const dispatch = useDispatch();

  if (!isDataLoaded) {
    return (
      <div>Загрузка данных ...</div>
    );
  }

  const sortedGuitarsByPrice = guitars.slice().sort(comparePrice);

  const handleMinPriceChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    +value < minPrice ? dispatch(changeMinPrice(sortedGuitarsByPrice[0].price)) : dispatch(changeMinPrice(+value));

    dispatch(changeActivePage(FIRST_PAGE));
  };

  const handleMaxPriceChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    +value > maxPrice ? dispatch(changeMaxPrice(sortedGuitarsByPrice[sortedGuitarsByPrice.length - 1].price)) : dispatch(changeMaxPrice(+value));

    dispatch(changeActivePage(FIRST_PAGE));
  };

  const handleGuitarTypesChange = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = guitarTypes.slice();
    let availableStrings: Array<number> = [];
    let checkedStrings = guitarStrings.slice();

    if (checked) {
      checkedTypes.push(name);
    } else {
      checkedTypes.splice(checkedTypes.indexOf(name), 1);
      if (checkedTypes.length === 0) {
        availableStrings = availableStringCountByTypes;
      }
    }

    checkedTypes.map((item) => {
      switch (item) {
        case 'acoustic':
          return availableStrings = availableStrings.concat(StringCountByTypes.acoustic);
        case 'electric':
          return availableStrings = availableStrings.concat(StringCountByTypes.electric);
        case 'ukulele':
          return availableStrings = availableStrings.concat(StringCountByTypes.ukulele);
        default:
          return availableStrings;
      }
    });

    availableStrings = Array.from(new Set([...availableStrings]));
    checkedStrings = getAvailableStringCount(checkedStrings, availableStrings);

    dispatch(changeGuitarTypes(checkedTypes));
    dispatch(changeAvailableStringCount(availableStrings));
    dispatch(changeGuitarStrings(checkedStrings));
    dispatch(changeActivePage(FIRST_PAGE));
  };

  const handleGuitarStringsChange = ({target: {value, checked}}: ChangeEvent<HTMLInputElement>) => {
    const checkedStrings = guitarStrings.slice();

    if (checked) {
      checkedStrings.push(+value);
    } else {
      checkedStrings.splice(checkedStrings.indexOf(+value), 1);
    }

    dispatch(changeGuitarStrings(checkedStrings));
    dispatch(changeActivePage(FIRST_PAGE));
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input key={Math.random()} type="number" placeholder={minPrice.toString()} id="priceMin" data-testid="priceMin" name="от" defaultValue={minPrice} onBlur={handleMinPriceChange} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input key={Math.random()} type="number" placeholder={maxPrice.toString()} id="priceMax" data-testid="priceMax" name="до" defaultValue={maxPrice} onBlur={handleMaxPriceChange} />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {allGuitarTypes.map((item) => (
          <div key={item} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={item}
              name={item}
              data-testid={item}
              onChange={handleGuitarTypesChange}
            />
            <label htmlFor={item}>{GuitarTypesTranslation.get(item)}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {availableStringCountByTypes.map((item) => (
          <div key={item} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${item}-strings`}
              name={`${item}-strings`}

              defaultValue={item}
              onChange={handleGuitarStringsChange} disabled={!availableStringCount.includes(item)}
              checked={guitarStrings.includes(item)}
            />
            <label htmlFor={`${item}-strings`} data-testid={`${item}-strings`}>{item}</label>
          </div>))}
      </fieldset>
    </form>
  );
}

export default GuitarsFilterComponent;
