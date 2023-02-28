import { CartItemType } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((acc, obj) => {
    return acc + obj.price * obj.count;
  }, 0);
};
