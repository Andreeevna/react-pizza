import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickCategory }) => {
    // useWhyDidYouUpdate('Categories', { categoryId, onClickCategory });
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
      <div className="categories">
        <ul>
          {categories.map((value, i) => {
            return (
              <li
                key={i}
                onClick={() => onClickCategory(i)}
                className={categoryId === i ? 'active' : ''}>
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
