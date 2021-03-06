import {system, name, random, datatype, lorem} from 'faker';
import {availableStringCountByTypes} from '../const';
import {Guitar, Comment, PostComment} from '../types/types';

const ID = 1;
const MIN_PRICE = 1700;
const MAX_PRICE = 35000;
const description = 'some text';
const GUITAR_TYPES = ['acoustic', 'electric', 'ukulele'];

const GenerateFakeComment = (): Comment => ({
  id: datatype.number({min: 1, max: 500}).toString(),
  userName: name.firstName(),
  advantage: lorem.paragraph(),
  disadvantage: lorem.paragraph(),
  comment: lorem.paragraph(),
  rating: Math.floor(Math.random() * 6),
  createAt: lorem.paragraph(),
  guitarId: ID,
});

const GenerateFakeCommentToPOST = (): PostComment => ({
  userName: name.firstName(),
  advantage: lorem.paragraph(),
  disadvantage: lorem.paragraph(),
  comment: lorem.paragraph(),
  rating: Math.floor(Math.random() * 6),
  guitarId: ID,
});

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
  comments: new Array(5).fill(null).map(() => GenerateFakeComment()),
});

export {GenerateFakeComment, GenerateFakeGuitar, GenerateFakeCommentToPOST, MIN_PRICE, MAX_PRICE};
