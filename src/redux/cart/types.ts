export type CartItemType = {
  id: string;
  imageUrl: string;
  title: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
