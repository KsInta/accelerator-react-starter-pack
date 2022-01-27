import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import MainScreen from '../main-screen/main-screen';
import PageNotFound from '../page-not-found/page-not-found';
import {getDataLoaded} from '../../store/app-data/selectors';

function App(): JSX.Element {
  const isDataLoaded = useSelector(getDataLoaded);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <MainScreen />
      </Route>
      <Route path="/guitars" exact>
        <MainScreen />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
