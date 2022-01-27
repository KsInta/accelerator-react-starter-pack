const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

const REQUEST_TIMEOUT = 5000;

const MAX_GUITAR_COUNT_ON_PAGE = 9;

const FIRST_PAGE = 1;

const PAGE_STEP_CHANGE = 1;

const MIN_PRICE = 0;

const MAX_PRICE = 0;

const enum AppRoute {
  Root = '/',
  Guitars = '/guitars/',
  GuitarsId = '/guitars/:id',
}

const enum APIRoute {
  Guitars = '/guitars',
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

const StringCountByTypes = {
  acoustic: ['6', '7', '12'],
  electric: ['4', '6', '7'],
  ukulele: ['4'],
};

const enum InformationMessages {
  DataLoadingSuccess = 'Данные успешно загружены',
  DataLoadingError = 'Ошибка загрузки данных. Попробуйте позже.',
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

export {MAX_GUITAR_COUNT_ON_PAGE, FIRST_PAGE, PAGE_STEP_CHANGE, BACKEND_URL, REQUEST_TIMEOUT, MIN_PRICE, MAX_PRICE, AppRoute, APIRoute, SortType, SortDirection, GuitarTypesTranslation, StringCountByTypes, InformationMessages, allGuitarTypes, availableStringCountByTypes, ratingInStars, getParams};
