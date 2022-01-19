const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

const REQUEST_TIMEOUT = 5000;

const MAX_GUITAR_COUNT_ON_PAGE = 9;

const FIRST_PAGE = 1;

const PAGE_STEP_CHANGE = 1;

const MIN_PRICE = 0;

const MAX_PRICE = 0;

const enum AppRoute {
  Root = '/',
  Guitar = '/guitars/',
  GuitarId = '/guitars/:id',
}

const enum APIRoute {
  Guitars = '/guitars',
}

const enum SortType {
  Default = 'Default',
  Price = 'Price',
  Rating = 'Rating'
}

const enum SortDirection {
  Default = 'Default',
  Ascension = 'Ascension',
  Descension = 'Descension',
}

const GuitarTypesTranslation = new Map([
  ['acoustic', 'Акустические гитары'],
  ['electric', 'Электрогитары'],
  ['ukulele', 'Укулеле'],
]);

const StringCountByTypes = {
  acoustic: [6, 7, 12],
  electric: [4, 6, 7],
  ukulele: [4],
};

const enum InformationMessages {
  DataLoadingSuccess = 'Данные успешно загружены',
  DataLoadingError = 'Ошибка загрузки данных. Попробуйте позже.',
}

const allGuitarTypes = ['acoustic', 'electric', 'ukulele'];

const availableStringCountByTypes = [4, 6, 7, 12];

export {MAX_GUITAR_COUNT_ON_PAGE, FIRST_PAGE, PAGE_STEP_CHANGE, BACKEND_URL, REQUEST_TIMEOUT, MIN_PRICE, MAX_PRICE, AppRoute, APIRoute, SortType, SortDirection, GuitarTypesTranslation, StringCountByTypes, InformationMessages, allGuitarTypes, availableStringCountByTypes};
