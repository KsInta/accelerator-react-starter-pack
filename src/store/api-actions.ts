import {ThunkActionResult} from '../types/actions';
import {toast} from 'react-toastify';
import {loadGuitars, loadGuitar, changeDiscount, toggleIsLoading, toggleIsPosting, toggleIsPostingCoupon, changeMinPrice, changeMaxPrice} from './actions';
import {Guitar, Guitars, PostComment, PostCoupon, GuitarsBranch} from '../types/types';
import {APIRoute} from '../const';
import {comparePrice} from '../sorting';
import {InformationMessages} from '../const';
import {getActualReviews} from '../utils/utils';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = `${APIRoute.Guitars}?_embed=comments`;
    try {
      dispatch(toggleIsLoading(false));
      const {data} = await api.get<Guitars>(baseUrl);
      const normalizedData = data.reduce<GuitarsBranch>((acc, item: Guitar) => {
        acc[item.id] = item;
        return acc;
      }, {});
      dispatch(loadGuitars(normalizedData));
      const dataSortedByPrice = data.slice().sort(comparePrice);
      dispatch(changeMinPrice(dataSortedByPrice[0].price));
      dispatch(changeMaxPrice(dataSortedByPrice[dataSortedByPrice.length - 1].price));
      dispatch(toggleIsLoading(true));
    } catch {
      toast.error(InformationMessages.DataLoadingError);
    }
  };

const fetchOfferByIdAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get(`${APIRoute.Guitars}/${id}?_embed=comments`);
      getActualReviews(data.comments);
      dispatch(loadGuitar(data));
    } catch {
      toast.error(InformationMessages.NoGuitarWithSuchId);
    }
  };

const postCommentAction = (id: number, comment: PostComment): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post(APIRoute.Comments, comment);
      const {data} = await api.get(`${APIRoute.Guitars}/${id}?_embed=comments`);
      getActualReviews(data.comments);
      dispatch(loadGuitar(data));
      dispatch(toggleIsPosting(true));
    } catch {
      toast.error(InformationMessages.ReviewPostError);
    }
  };

const postCouponAction = (coupon: PostCoupon): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(toggleIsPostingCoupon(true));
      const {data} = await api.post(APIRoute.Coupons, coupon);
      dispatch(changeDiscount(data));
      dispatch(toggleIsPostingCoupon(false));
    } catch {
      toast.error(InformationMessages.CouponPostError);
    }
  };

export {fetchGuitarsAction, fetchOfferByIdAction, postCommentAction, postCouponAction};
