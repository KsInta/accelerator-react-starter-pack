import {system, name, internet, random, commerce, address, datatype} from 'faker';
import {availableStringCountByTypes} from '../const';
import {Guitar} from '../types/types';

const ID = 1;
const MIN_PRICE = 1700;
const MAX_PRICE = 35000;
const description = 'some text';
const GUITAR_TYPES = ['acoustic', 'electric', 'ukulele'];


const GenerateFakeGuitar = (): Guitar => ({
  id: ID,
  name: name.firstName(),
  vendorCode: datatype.number({min: 100000, max: 200000}).toString(),
  type: random.arrayElement(GUITAR_TYPES),
  description,
  previewImg: system.filePath(),
  stringCount: random.arrayElement(availableStringCountByTypes),
  rating: datatype.number({min: 1, max: 5}),
  price: datatype.number({min: MIN_PRICE, max: MAX_PRICE}),
});

export {GenerateFakeGuitar, MIN_PRICE, MAX_PRICE};
