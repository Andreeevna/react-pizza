export type SortType = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

export type FilterSliceState = {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
};
