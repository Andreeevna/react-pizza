import React from "react";
import PropTypes from "prop-types";


const Categories =   React.memo(function ({ activeCategory, items, onClickItem }) {

  const onSelectItem = (index) => {
    onClickItem(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => onSelectItem(null)}
        >
          Все
        </li>
        {items &&
          items.map((item, index) => {
            return (
              <li
                className={activeCategory === index ? "active" : ""}
                onClick={() => onSelectItem(index)}
                key={`${item}_${index}`}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickItem: PropTypes.func
};

Categories.defaultProps = {
   activeCategory: null, 
   items: []
  };

export default Categories;
