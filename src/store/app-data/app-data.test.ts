import {AppData} from '../../types/state';
import {appData} from './app-data';
import {loadGuitar, loadGuitars, loadGuitarComments, toggleIsLoading, toggleIsGuitarLoading, toggleIsPosting} from '../actions';
import {GenerateFakeComment, GenerateFakeGuitar} from '../../mock/mock';
import {Guitar} from '../../types/types';

const GUITAR_COUNT = 25;
const COMMENTS_COUNT = 5;

const initialState: AppData = {
  guitars: [],
  guitar: {} as Guitar,
  guitarComments: [],
  isDataLoaded: false,
  isGuitarLoaded: false,
  isCommentPosted: false,
};

const fakeGuitar = GenerateFakeGuitar();

const fakeGuitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});

const fakeComments = new Array(COMMENTS_COUNT).fill(null).map((comment) => comment = {...GenerateFakeComment()});

describe('Reducer: appData', () => {
  const state = initialState;
  it('should update guitars by loadGuitars', () => {
    expect(appData(state, loadGuitars(fakeGuitars)))
      .toEqual({ ...state, guitars: fakeGuitars});
  });
  it('should update guitar by loadGuitar', () => {
    expect(appData(state, loadGuitar(fakeGuitar)))
      .toEqual({ ...state, guitar: fakeGuitar});
  });
  it('should update comments by loadGuitarComments', () => {
    expect(appData(state, loadGuitarComments(fakeComments)))
      .toEqual({ ...state, guitarComments: fakeComments});
  });
  it('should change isDataLoaded by toggleIsLoading', () => {
    const isDataLoaded = true;
    expect(appData(state, toggleIsLoading(isDataLoaded)))
      .toEqual({...state, isDataLoaded});
  });
  it('should change isGuitarLoaded by toggleIsGuitarLoading', () => {
    const isGuitarLoaded = true;
    expect(appData(state, toggleIsGuitarLoading(isGuitarLoaded)))
      .toEqual({...state, isGuitarLoaded});
  });
  it('should change isCommentPosted by toggleIsPosting', () => {
    const isCommentPosted = true;
    expect(appData(state, toggleIsPosting(isCommentPosted)))
      .toEqual({...state, isCommentPosted});
  });
});
