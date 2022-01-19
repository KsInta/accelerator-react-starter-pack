import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute, AppRoute} from '../const';
import {fetchGuitarsAction} from './api-actions';
import {State} from '../types/state';
import {toggleIsLoading, loadGuitars, changeMinPrice, changeMaxPrice} from './actions';
import {GenerateFakeGuitar} from '../mock/mock';
import {comparePrice} from '../sorting';

const GUITAR_COUNT = 25;

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadGuitars when GET /', async () => {
    const fakeGuitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, fakeGuitars);

    const dataSortedByPrice = fakeGuitars.slice().sort(comparePrice);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      toggleIsLoading(false), loadGuitars(fakeGuitars), changeMinPrice(dataSortedByPrice[0].price), changeMaxPrice(dataSortedByPrice[dataSortedByPrice.length - 1].price), toggleIsLoading(true)
    ]);
  });
});
