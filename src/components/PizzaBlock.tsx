import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../redux/cart/selectors';
import { addItem } from '../redux/cart/slice';
import { CartItemType } from '../redux/cart/types';

const typesNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const [sizeActive, setsizeActive] = useState(0);
  const [typeActive, setTypeActive] = useState(0);

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      imageUrl,
      types: typesNames[typeActive],
      sizes: sizes[sizeActive],
      price,
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types &&
              types.map((typesId) => {
                return (
                  <li
                    key={typesId}
                    onClick={() => setTypeActive(typesId)}
                    className={typeActive === typesId ? 'active' : ''}>
                    {[typesNames[typesId]]}
                  </li>
                );
              })}
          </ul>
          <ul>
            {sizes &&
              sizes.map((value, index) => {
                return (
                  <li
                    key={value}
                    onClick={() => setsizeActive(index)}
                    className={sizeActive === index ? 'active' : ''}>
                    {value} см.
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price}₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
