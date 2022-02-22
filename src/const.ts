const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

const REQUEST_TIMEOUT = 5000;

const MAX_GUITAR_COUNT_ON_PAGE = 9;

const FIRST_PAGE = 1;

const PAGE_STEP_CHANGE = 1;

const MIN_PRICE = 0;

const MAX_PRICE = 0;

const REVIEWS_COUNT_STEP = 3;

const MIN_GUITAR_COUNT_IN_CART = 1;

const MAX_GUITAR_COUNT_IN_CART = 99;

const BASIC_DISCOUNT = 0;

const GUITARS_IN_CART_KEY_NAME = 'guitars-in-cart';

const enum AppRoute {
  Root = '/',
  Guitars = '/guitars',
  GuitarsId = '/guitars/:id',
  Cart = '/cart',
}

const enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
}

const enum SortType {
  Default = 'default',
  Price = 'price',
  Rating = 'rating'
}

const enum SortDirection {
  Default = 'default',
  Ascension = 'asc',
  Descension = 'desc',
}

const GuitarTypesTranslation = new Map([
  ['acoustic', 'Акустические гитары'],
  ['electric', 'Электрогитары'],
  ['ukulele', 'Укулеле'],
]);

const GuitarTypesTranslationForProductPage = new Map([
  ['acoustic', 'Акустическая'],
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
]);

const StringCountByTypes = {
  acoustic: ['6', '7', '12'],
  electric: ['4', '6', '7'],
  ukulele: ['4'],
};

const enum InformationMessages {
  DataLoadingSuccess = 'Данные успешно загружены',
  DataLoadingError = 'Ошибка загрузки данных. Попробуйте позже.',
  NoGuitarWithSuchId = 'Гитара с таким идентификатором не найдена',
  CommentsLoadingError = 'Не удалось загрузить комментарии. Попробуйте позже',
  ReviewPostError = 'Не удалось отправить комментарий. Попробуйте позже.',
  CouponPostError = 'Не удалось отправить купон. Попробуйте позже',
}

const allGuitarTypes = ['acoustic', 'electric', 'ukulele'];

const availableStringCountByTypes = ['4', '6', '7', '12'];

const ratingInStars = [1, 2, 3, 4, 5];

const getParams = {
  page: 'page',
  sort: '_sort',
  direction: '_order',
  type: 'type',
  stringCount: 'stringCount',
  minPrice: 'price_gte',
  maxPrice: 'price_lte',
};

const RatingStar = [
  {score: '5', titleName: 'Отлично'},
  {score: '4', titleName: 'Хорошо'},
  {score: '3', titleName: 'Нормально'},
  {score: '2', titleName: 'Плохо'},
  {score: '1', titleName: 'Ужасно'},
];

const coupons = ['light-333', 'medium-444', 'height-555'];

export {MAX_GUITAR_COUNT_ON_PAGE, FIRST_PAGE, PAGE_STEP_CHANGE, BACKEND_URL, REQUEST_TIMEOUT, MIN_PRICE, MAX_PRICE, REVIEWS_COUNT_STEP, MIN_GUITAR_COUNT_IN_CART, MAX_GUITAR_COUNT_IN_CART, BASIC_DISCOUNT, GUITARS_IN_CART_KEY_NAME, AppRoute, APIRoute, SortType, SortDirection, GuitarTypesTranslation, GuitarTypesTranslationForProductPage, StringCountByTypes, InformationMessages, allGuitarTypes, availableStringCountByTypes, ratingInStars, getParams, RatingStar, coupons};
