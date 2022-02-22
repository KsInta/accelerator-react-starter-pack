import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {createAPI} from './services/api';
import {rootReducer} from './store/root-reducer';
import {fetchGuitarsAction} from './store/api-actions';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import {Router} from 'react-router-dom';
import {GUITARS_IN_CART_KEY_NAME} from './const';
import {getGuitarsInCartFromLocalStorage} from './services/guitars-in-cart';
import {changeGuitarsInCart} from './store/actions';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});


(store.dispatch)(fetchGuitarsAction());
if (localStorage.getItem(GUITARS_IN_CART_KEY_NAME)) {
  (store.dispatch)(changeGuitarsInCart(JSON.parse(getGuitarsInCartFromLocalStorage())));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Router history={browserHistory}>
        <ToastContainer />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
