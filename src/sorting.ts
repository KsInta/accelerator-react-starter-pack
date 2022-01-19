import {SortType, SortDirection} from './const';
import {Guitar, Guitars} from './types/types';

const comparePrice = (objA: Guitar, objB: Guitar): number => objA.price - objB.price;
const compareRating = (objA: Guitar, objB: Guitar): number => objA.rating - objB.rating;

const getSortedGuitarsByDirection = (guitars: Guitars, sortType: string, sortDirection: string): Guitars => {
  switch (sortType) {
    case SortType.Price:
      switch (sortDirection) {
        case SortDirection.Descension:
          return guitars.sort(comparePrice).reverse();
        default:
          return guitars.sort(comparePrice);
      }
    case SortType.Rating:
      switch (sortDirection) {
        case SortDirection.Descension:
          return guitars.sort(compareRating).reverse();
        default:
          return guitars.sort(compareRating);
      }
    default:
      return guitars;
  }
};

export {comparePrice, getSortedGuitarsByDirection};
