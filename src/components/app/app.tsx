import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import CartPage from '../cart-page/cart-page';
import LoadingScreen from '../loading-screen/loading-screen';
import MainScreen from '../main-screen/main-screen';
import PageNotFound from '../page-not-found/page-not-found';
import ProductPage from '../product-page/product-page';
import {getDataLoaded} from '../../store/app-data/selectors';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  const isDataLoaded = useSelector(getDataLoaded);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route path={AppRoute.Root} exact>
        <MainScreen />
      </Route>
      <Route path={AppRoute.Cart} exact>
        <CartPage />
      </Route>
      <Route path={AppRoute.Guitars} exact>
        <MainScreen />
      </Route>
      <Route path={AppRoute.GuitarsId} exact>
        <ProductPage />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
