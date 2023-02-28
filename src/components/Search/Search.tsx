import React from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    // if (inputRef.current) {
    inputRef.current?.focus();
    // }
  };

  const updateSearchValue = React.useCallback(
    debounce((string: string) => {
      dispatch(setSearchValue(string));
    }, 150),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы.."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.close}
          width="800px"
          height="800px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#000000"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
