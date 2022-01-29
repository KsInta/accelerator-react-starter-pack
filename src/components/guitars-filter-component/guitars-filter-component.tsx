import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {ChangeEvent} from 'react';
import {changeActivePage, changeMinPrice, changeMaxPrice, changeGuitarTypes, changeGuitarStrings} from '../../store/actions';
import {FIRST_PAGE, GuitarTypesTranslation, allGuitarTypes, availableStringCountByTypes, getParams, StringCountByTypes} from '../../const';
import {getDataLoaded, getGuitars} from '../../store/app-data/selectors';
import {getMinPrice, getMaxPrice} from '../../store/filter-process/selectors';
import browserHistory from '../../browser-history';
import {useLocation} from 'react-router-dom';
import {comparePrice} from '../../sorting';

function GuitarsFilterComponent(): JSX.Element {
  const isDataLoaded = useSelector(getDataLoaded);
  const guitars = useSelector(getGuitars);
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const dispatch = useDispatch();

  const {search, pathname} = useLocation();
  const urlParams = new URLSearchParams(search);

  const minPriceURL = urlParams.get(getParams.minPrice) ? Number(urlParams.get(getParams.minPrice)) : minPrice;
  const maxPriceURL = urlParams.get(getParams.maxPrice) ? Number(urlParams.get(getParams.maxPrice)) : maxPrice;

  const guitarType = urlParams.getAll(getParams.type);
  const numberOfString = urlParams.getAll(getParams.stringCount);
  const urlTypes = urlParams.getAll(getParams.type);
  const urlStrings = urlParams.getAll(getParams.stringCount);

  const [minPriceFromUrl] = useState(minPriceURL);
  const [maxPriceFromUrl] = useState(maxPriceURL);
  const [types] = useState(urlTypes);
  const [strings] = useState(urlStrings);
  const [minPriceInInput, setMinPriceInInput] = useState(minPrice);
  const [maxPriceInInput, setMaxPriceInInput] = useState(maxPrice);

  let availableStrings: Array<string> = [];
  guitarType.slice().map((item) => {
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

  if (guitarType.length === 0) {
    availableStrings = availableStringCountByTypes;
  }

  availableStrings = Array.from(new Set([...availableStrings]));

  const sortedGuitarsByPrice = guitars.slice().sort(comparePrice);

  const handleMinPriceChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setMinPriceInInput(+value);
  };

  const handleMaxPriceChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setMaxPriceInInput(+value);
  };

  const handleMinPriceBlur = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (+value < sortedGuitarsByPrice[0].price) {
      dispatch(changeMinPrice(sortedGuitarsByPrice[0].price));
      setMinPriceInInput(sortedGuitarsByPrice[0].price);
    } else if (+value > maxPrice) {
      dispatch(changeMinPrice(maxPrice));
      setMinPriceInInput(maxPrice);
    } else {
      dispatch(changeMinPrice(+value));
    }

    dispatch(changeActivePage(FIRST_PAGE));

    +value >= sortedGuitarsByPrice[0].price && +value <= sortedGuitarsByPrice[sortedGuitarsByPrice.length - 1].price ? urlParams.set(getParams.minPrice, value) : urlParams.delete(getParams.minPrice);

    urlParams.set(getParams.page, FIRST_PAGE.toString());

    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleMaxPriceBlur = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (+value > sortedGuitarsByPrice[sortedGuitarsByPrice.length - 1].price) {
      dispatch(changeMaxPrice(sortedGuitarsByPrice[sortedGuitarsByPrice.length - 1].price));
      setMaxPriceInInput(sortedGuitarsByPrice[sortedGuitarsByPrice.length - 1].price);
    } else if (+value < minPrice) {
      dispatch(changeMaxPrice(minPrice));
      setMaxPriceInInput(minPrice);
    } else {
      dispatch(changeMaxPrice(+value));
    }

    dispatch(changeActivePage(FIRST_PAGE));

    +value >= sortedGuitarsByPrice[0].price && +value <= sortedGuitarsByPrice[sortedGuitarsByPrice.length - 1].price ? urlParams.set(getParams.maxPrice, value) : urlParams.delete(getParams.maxPrice);

    urlParams.set(getParams.page, FIRST_PAGE.toString());

    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleGuitarTypesChange = ({target: {name}}: ChangeEvent<HTMLInputElement>) => {
    const selectedGuitarTypes = [...guitarType];
    const index = selectedGuitarTypes.findIndex((type) => name === type);
    index === -1 ? selectedGuitarTypes.push(name) : selectedGuitarTypes.splice(index, 1);

    dispatch(changeGuitarTypes(selectedGuitarTypes));
    dispatch(changeActivePage(FIRST_PAGE));

    urlParams.delete(getParams.type);

    selectedGuitarTypes.forEach((item) => urlParams.append(getParams.type, item));

    urlParams.set(getParams.page, FIRST_PAGE.toString());

    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  const handleGuitarStringsChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    const selectedNumberOfString = [...numberOfString];
    const index = selectedNumberOfString.findIndex((stringType) => stringType === value);

    index === -1 ? selectedNumberOfString.push(value) : selectedNumberOfString.splice(index, 1);

    dispatch(changeGuitarStrings(selectedNumberOfString));
    dispatch(changeActivePage(FIRST_PAGE));

    urlParams.delete(getParams.stringCount);

    selectedNumberOfString.forEach((item) => urlParams.append(getParams.stringCount, item));

    urlParams.set(getParams.page, FIRST_PAGE.toString());

    browserHistory.push({
      pathname: pathname,
      search: urlParams.toString(),
    });
  };

  useEffect(() => {
    dispatch(changeMinPrice(minPriceFromUrl));
    setMinPriceInInput(minPriceFromUrl);
  }, [minPriceFromUrl]);

  useEffect(() => {
    dispatch(changeMaxPrice(maxPriceFromUrl));
    setMaxPriceInInput(maxPriceFromUrl);
  }, [maxPriceFromUrl]);

  useEffect(() => {
    dispatch(changeGuitarTypes(types));
  }, [types]);

  useEffect(() => {
    dispatch(changeGuitarStrings(strings));
  }, [strings]);

  if (!isDataLoaded) {
    return (
      <div>Загрузка данных ...</div>
    );
  }

  return (
    <form className="catalog-filter">
      <span></span>
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={minPrice.toString()} id="priceMin" data-testid="priceMin" name="от" value={minPriceInInput} onChange={handleMinPriceChange} onBlur={handleMinPriceBlur} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={maxPrice.toString()} id="priceMax" data-testid="priceMax" name="до" value={maxPriceInInput} onChange={handleMaxPriceChange} onBlur={handleMaxPriceBlur} />
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
              checked={guitarType.includes(item)}
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
              value={item}
              onChange={handleGuitarStringsChange}
              disabled={!availableStrings.includes(item)}
              checked={numberOfString.includes(item.toString())}
              data-testid={`${item}-strings`}
            />
            <label htmlFor={`${item}-strings`}>{item}</label>
          </div>))}
      </fieldset>
    </form>
  );
}

export default GuitarsFilterComponent;
