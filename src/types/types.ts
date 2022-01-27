type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: string,
  rating: number,
  price: number
}

type Guitars = Guitar[];

export type {Guitar, Guitars};
