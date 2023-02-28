import { SortType } from '../filter/types';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERORR = 'error',
}

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  rating: number;
};

export type FetchPizzasType = {
  currentPage: number;
  categoryId: number;
  sort: SortType;
  search: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  currentPage: number;
  categoryId: number;
  sort: SortType;
  search: string;
};
