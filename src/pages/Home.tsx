import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import { PizzaLoading } from '../components/PizzaLoading';
import { Sort } from '../components/Sort';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/slice';
import { RootState, useAppDispatch } from '../redux/store';
import { selectPizzasData } from '../redux/pizza/selectors';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sort = useSelector((state: RootState) => state.filter.sort);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const { searchValue } = useSelector((state: RootState) => state.filter);

  const { items, status } = useSelector(selectPizzasData);

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(fetchPizzas({ currentPage, categoryId, sort, search }));

    window.scrollTo(0, 0);
  };

  const pizzas = items.map((obj: any) => {
    return <PizzaBlock key={obj.id} {...obj} />;
  });

  const skeletons = [...new Array(6)].map((_, index) => {
    return <PizzaLoading key={index} />;
  });

  const onClickCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  //если изменили параметры и был первый рендер

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //если был первый рендер то проверяем параметры и сохраняем в редаксе

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));

  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
  //     if (sort) {
  //       params.sort = sort;
  //     }

  //     dispatch(setFilters(params as unknown as FilterSliceState));
  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первый рендер то запрашиваем пиццы

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
