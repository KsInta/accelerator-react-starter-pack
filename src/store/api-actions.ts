import {ThunkActionResult} from '../types/actions';
import {toast} from 'react-toastify';
import {loadGuitars, toggleIsLoading, changeMinPrice, changeMaxPrice} from './actions';
import {Guitars} from '../types/types';
import {APIRoute} from '../const';
import {comparePrice} from '../sorting';
import {InformationMessages} from '../const';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(toggleIsLoading(false));
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
      const dataSortedByPrice = data.slice().sort(comparePrice);
      dispatch(changeMinPrice(dataSortedByPrice[0].price));
      dispatch(changeMaxPrice(dataSortedByPrice[dataSortedByPrice.length - 1].price));
      dispatch(toggleIsLoading(true));
    } catch {
      toast.error(InformationMessages.DataLoadingError);
    }
  };

export {fetchGuitarsAction};
