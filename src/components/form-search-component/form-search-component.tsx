import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ChangeEvent, useState} from 'react';
import {Guitars} from '../../types/types';
import {AppRoute} from '../../const';
import {getGuitars} from '../../store/app-data/selectors';

function FormSearchComponent(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const [searchString, setSearchString] = useState<string>('');
  const [focusOnSearch, setFocusOnSearch] = useState<boolean>(false);
  let searchList: Guitars = [];

  const handleChange = ({target: {value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(value);
  };

  if (searchString.length > 0) {
    searchList = Object.values(guitars).filter((guitar) => guitar.name.toLowerCase().includes(searchString.toLowerCase()));
  }

  let searchHidden = '';
  if ((searchList.length < 1) || !focusOnSearch) {
    searchHidden = 'hidden';
  }

  return (
    <div className="form-search" onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setFocusOnSearch(false);
      }
    }}
    >
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={handleChange}
          onFocus={() => setFocusOnSearch(true)}
          value={searchString}
          data-testid="search"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${searchHidden}`}>
        {searchList.map((item) => <li key={item.id} className="form-search__select-item"><Link to={`${AppRoute.Guitars}/${item.id}`} onClick={() => {setFocusOnSearch(false);setSearchString('');}} style={{color: 'white'}}>{item.name}</Link></li>)}
      </ul>
    </div>
  );
}

export default FormSearchComponent;
