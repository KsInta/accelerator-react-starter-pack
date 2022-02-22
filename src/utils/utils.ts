import {Guitars, Comments, GuitarsBranch} from '../types/types';
import {MAX_GUITAR_COUNT_ON_PAGE, FIRST_PAGE, StringCountByTypes, availableStringCountByTypes} from '../const';

const getFilteredGuitarsByPrice = (guitars : Guitars, minPrice: number | string, maxPrice: number | string): Guitars => guitars.filter((guitar) => guitar.price >= minPrice && guitar.price <= maxPrice);

const getFilteredGuitarsByTypes = (guitars: Guitars, guitarTypes: Array<string>): Guitars => guitars.filter((guitar) => guitarTypes.join().toLowerCase().includes(guitar.type));

const getFilteredGuitarsByStrings = (guitars: Guitars, guitarStrings: Array<string>): Guitars => guitars.filter((guitar) => guitarStrings.includes(guitar.stringCount.toString()));

const getFilteredGuitarsTest = (guitars: Guitars, guitarTypes: Array<string>, guitarStrings: Array<string>): Guitars => {
  if (guitarTypes.length > 0) {
    guitars = getFilteredGuitarsByTypes(guitars, guitarTypes);
  }
  if (guitarStrings.length > 0) {
    guitars = getFilteredGuitarsByStrings(guitars, guitarStrings);
  }

  return guitars;
};

const getFilteredGuitarsByAllFilters = (guitars: Guitars, minPrice: number | string, maxPrice: number | string, guitarTypes: Array<string>, guitarStrings: Array<string>): Guitars => {
  guitars = getFilteredGuitarsByPrice(guitars, minPrice, maxPrice);
  if (guitarTypes.length > 0) {
    guitars = getFilteredGuitarsByTypes(guitars, guitarTypes);
  }
  if (guitarStrings.length > 0) {
    guitars = getFilteredGuitarsByStrings(guitars, guitarStrings);
  }

  return guitars;
};

const getAvailableStringCount = (checkedStrings: Array<number>, availableStrings: Array<number>): Array<number> => checkedStrings.filter((item) => availableStrings.includes(item));

const getPagesCount = (guitars: Guitars): Array<number> => {
  const pagesCount = Math.ceil(guitars.length / MAX_GUITAR_COUNT_ON_PAGE);
  const pages: Array<number> = [];
  let counter = FIRST_PAGE;
  while (counter <= pagesCount) {
    pages.push(counter);
    counter++;
  }

  return pages;
};

const getAvailableStrings = (guitarType: Array<string>) => {
  let availableStrings: Array<string> = [];
  guitarType.slice().map((item) => {
    switch (item) {
      case 'acoustic':
        return availableStrings = availableStrings.concat(StringCountByTypes.acoustic);
      case 'electric':
        return availableStrings = availableStrings.concat(StringCountByTypes.electric);
      case 'ukulele':
        return availableStrings = availableStrings.concat(StringCountByTypes.ukulele);
      default:
        return availableStrings;
    }
  });

  if (guitarType.length === 0) {
    availableStrings = availableStringCountByTypes;
  }

  availableStrings = Array.from(new Set([...availableStrings]));

  return availableStrings;
};

const getActualReviews = (reviews: Comments): Comments => reviews.sort((reviewA, reviewB) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt));

const objectToArray = (guitars: GuitarsBranch) => {
  const resultArray = Object.keys(guitars).map((index) => {
    const guitar = guitars[+index];
    return guitar;
  });

  return resultArray;
};

export {getFilteredGuitarsByPrice, getFilteredGuitarsByTypes, getFilteredGuitarsByStrings, getAvailableStringCount, getFilteredGuitarsByAllFilters, getPagesCount, getFilteredGuitarsTest, getAvailableStrings, getActualReviews, objectToArray};
