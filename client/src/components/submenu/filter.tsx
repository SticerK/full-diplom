import Sort from './sort';
import { useDispatch } from 'react-redux';
import { setFilter, setSort } from '../../redux/changeDataSlice';
import React from 'react';

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='filter hide'>
      <input
        className='filter-input'
        type='text'
        placeholder='Название'
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <Sort setSort={setSort} />
    </div>
  );
};

export default Filter;
