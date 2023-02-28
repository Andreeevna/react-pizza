import { CartItemType } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  return {
    items: items as CartItemType[],
    totalPrice,
  };
};
