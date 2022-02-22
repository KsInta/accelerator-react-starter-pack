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
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

type PostComment = {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
};

type PostCoupon = {
  coupon: string,
};

interface GuitarsBranch {
  [guitarId: number]: Guitar;
}

type Guitars = Guitar[];

type Comments = Comment[];

interface GuitarsInCart {
  [guitarId: number]: number;
}

export type {Guitar, Guitars, Comment, Comments, PostComment, PostCoupon, GuitarsBranch, GuitarsInCart};
