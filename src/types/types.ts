type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: string,
  rating: number,
  price: number,
  comments: Comment[],
}

type Comment = {
  id: string,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

type Guitars = Guitar[];

export type {Guitar, Guitars, Comment};
