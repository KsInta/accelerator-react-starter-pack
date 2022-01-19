import {AppData} from '../../types/state';
import {appData} from './app-data';
import {loadGuitars, toggleIsLoading} from '../actions';
import {GenerateFakeGuitar} from '../../mock/mock';

const GUITAR_COUNT = 25;

const initialState: AppData = {
  guitars: [],
  isDataLoaded: false,
};

const guitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});

describe('Reducer: appData', () => {
  const state = initialState;
  it('should update guitars by loadGuitars', () => {
    expect(appData(state, loadGuitars(guitars)))
      .toEqual({ ...state, guitars});
  });
  it('should change isDataLoaded by toggleIsLoading', () => {
    const isDataLoaded = true;
    expect(appData(state, toggleIsLoading(isDataLoaded)))
      .toEqual({...state, isDataLoaded});
  });
});
