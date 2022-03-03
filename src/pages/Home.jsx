import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, SortPopup, PizzaBlock, PizzaLoading } from "../components";
import { setCategoryAC,setSortByAC } from "../redux/reducers/filters";
import { fetchPizzas } from "../redux/reducers/pizzas";
import { addPizzaToCartAC } from './../redux/reducers/cart';

const categoriesNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "name" },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoading = useSelector(({ pizzas }) => pizzas.isLoading);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategoryAC(index));
  }, []);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortByAC(type));
  })

  const addPizzaToCart = (obj) => {
    dispatch(addPizzaToCartAC(obj))
    
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
        activeCategory={category} 
        onClickItem={onSelectCategory} 
        items={categoriesNames} />
        <SortPopup 
        activeSortType={sortBy} 
        items={sortItems} 
        onClickSortType={onSelectSortType}
      />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? items.map((obj) => (
              <PizzaBlock onClickAddPizza={addPizzaToCart} 
              key={obj.id} 
              inCartCount={cartItems[obj.id] && cartItems[obj.id].items.length}
              {...obj} />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoading key={index} />)}
      </div>
    </div>
  );
}

export default Home;
