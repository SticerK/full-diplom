import styles from './submenu.module.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

type SortTypes = {
  setSort: (arg: SortByType) => any;
};

export type SortByType = {
  value: string;
  title: string;
  sort: string;
};

const sortBy: SortByType[] = [
  { value: 'price', title: 'По возрастанию цены', sort: 'asc' },
  { value: 'price', title: 'По уменьшению цены', sort: 'desc' },
  { value: 'title', title: 'По названию', sort: 'asc' },
];

const Sort: React.FC<SortTypes> = ({ setSort }) => {
  const dispath = useDispatch();
  const [active, setActive] = useState<number>();

  const handleClick = (sort: SortByType, index: number) => {
    setActive(index);
    dispath(setSort(sort));
  };

  return (
    <div className={styles.sort}>
      <p>Сортировать по:</p>
      {sortBy.map((item, index) => (
        <div
          key={item.title}
          className={styles.sortItem}
          style={active === index ? { color: 'rgb(82, 254, 197)' } : {}}
          onClick={() => handleClick(item, index)}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Sort;
