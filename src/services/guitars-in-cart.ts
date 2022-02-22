import {GuitarsInCart} from '../types/types';
import {GUITARS_IN_CART_KEY_NAME} from '../const';

const getGuitarsInCartFromLocalStorage = (): string => {
  const guitarsInCart = localStorage.getItem(GUITARS_IN_CART_KEY_NAME);
  return guitarsInCart ?? '';
};

const saveGuitarsInCartInLocalStorage = (guitarsInCart: GuitarsInCart): void => {
  localStorage.setItem(GUITARS_IN_CART_KEY_NAME, JSON.stringify(guitarsInCart));
};

export {getGuitarsInCartFromLocalStorage, saveGuitarsInCartInLocalStorage};
