import {FilterProcess} from '../../types/state';
import {filterProcess} from './filter-process';
import {MIN_PRICE, MAX_PRICE, allGuitarTypes, availableStringCountByTypes} from '../../const';
import {changeMinPrice, changeMaxPrice, changeGuitarTypes, changeGuitarStrings, changeAvailableStringCount} from '../actions';

const NEW_MIN_PRICE = 1700;
const NEW_MAX_PRICE = 35000;
const availableStringCount = ['7', '12'];

const initialState: FilterProcess = {
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  guitarTypes: [],
  guitarStrings: [],
  availableStringCount: availableStringCountByTypes,
};

describe('Reducer: filterProcess', () => {
  const state = initialState;
  it('should update minPrice by changeMinPrice', () => {
    expect(filterProcess(state, changeMinPrice(NEW_MIN_PRICE)))
      .toEqual({...state, minPrice: NEW_MIN_PRICE});
  });
  it('should update minPrice by changeMaxPrice', () => {
    expect(filterProcess(state, changeMaxPrice(NEW_MAX_PRICE)))
      .toEqual({...state, maxPrice: NEW_MAX_PRICE});
  });
  it('should update guitarTypes by changeGuitarTypes', () => {
    expect(filterProcess(state, changeGuitarTypes(allGuitarTypes)))
      .toEqual({...state, guitarTypes: allGuitarTypes});
  });
  it('should update guitarStrings by changeGuitarStrings', () => {
    expect(filterProcess(state, changeGuitarStrings(availableStringCountByTypes)))
      .toEqual({...state, guitarStrings: availableStringCountByTypes});
  });
  it('should update availableStringCount by changeAvailableStringCount', () => {
    expect(filterProcess(state, changeAvailableStringCount(availableStringCount)))
      .toEqual({...state, availableStringCount});
  });
});
