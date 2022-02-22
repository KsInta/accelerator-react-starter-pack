import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../const';
import {fetchGuitarsAction, fetchOfferByIdAction, postCouponAction} from './api-actions';
import {State} from '../types/state';
import {toggleIsLoading, loadGuitars, loadGuitar, changeMinPrice, changeMaxPrice, changeDiscount, toggleIsPostingCoupon} from './actions';
import {Guitar, GuitarsBranch} from '../types/types';
import {GenerateFakeComment, GenerateFakeGuitar, GenerateFakeCommentToPOST} from '../mock/mock';
import {comparePrice} from '../sorting';
import {datatype, lorem} from 'faker';

const GUITAR_COUNT = 25;
const COMMENTS_COUNT = 5;

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);
  const fakeComments = new Array(COMMENTS_COUNT).fill(null).map((comment) => comment = {...GenerateFakeComment()});

  it('should dispatch loadGuitars when GET /', async () => {
    const fakeGuitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});
    const normalizedDataMore = fakeGuitars.reduce<GuitarsBranch>((acc, item: Guitar) => {
      acc[item.id] = item;
      return acc;
    }, {});

    mockAPI
      .onGet(`${APIRoute.Guitars}?_embed=comments`)
      .reply(200, fakeGuitars);

    const dataSortedByPrice = Object.values(normalizedDataMore).slice().sort(comparePrice);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      toggleIsLoading(false),
      loadGuitars(normalizedDataMore),
      changeMinPrice(dataSortedByPrice[0].price),
      changeMaxPrice(dataSortedByPrice[dataSortedByPrice.length - 1].price),
      toggleIsLoading(true),
    ]);
  });

  it('should dispatch loadGuitar when GET /', async () => {
    const fakeGuitar = GenerateFakeGuitar();

    mockAPI
      .onGet(`${APIRoute.Guitars}/${fakeGuitar.id}?_embed=comments`)
      .reply(200, fakeGuitar);

    const store = mockStore();
    await store.dispatch(fetchOfferByIdAction(fakeGuitar.id.toString()));

    expect(store.getActions()).toEqual([
      loadGuitar(fakeGuitar),
    ]);
  });

  it('should dispatch loadGuitarComments when comment POST /', async () => {
    const fakeGuitar = GenerateFakeGuitar();
    const fakeComment = GenerateFakeCommentToPOST();
    const fakeCommentFromServer = {id: datatype.number({min: 1, max: 500}).toString(), createAt: lorem.paragraph(), ...fakeComment};
    const fakeCommentsAfterPOST = fakeComments.slice();
    fakeCommentsAfterPOST.push(fakeCommentFromServer);


    mockAPI
      .onPost(`${APIRoute.Comments}`, fakeComment)
      .reply(200)
      .onGet(`${APIRoute.Guitars}/${fakeCommentsAfterPOST[0].guitarId}?_embed=comments`)
      .reply(200, fakeGuitar);

    const store = mockStore();
    await store.dispatch(fetchOfferByIdAction(fakeGuitar.id.toString()));

    expect(store.getActions()).toEqual([
      loadGuitar(fakeGuitar),
    ]);
  });

  it('should dispatch changeDiscount when coupon POST /', async () => {
    const discount = 25;
    const coupon = {coupon: 'light-333'};

    mockAPI
      .onPost(`${APIRoute.Coupons}`, coupon)
      .reply(200, discount);

    const store = mockStore();
    await store.dispatch(postCouponAction(coupon));

    expect(store.getActions()).toEqual([
      toggleIsPostingCoupon(true),
      changeDiscount(discount),
      toggleIsPostingCoupon(false),
    ]);
  });
});
