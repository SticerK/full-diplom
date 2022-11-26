import { useState } from 'react';
import MySelect from '../UI/MySelect';

const Filter = ({ changeFilter, inputFilter, data }) => {
  const [inputValue, setInputValue] = useState('');
  console.log(data);
  const handleChange = ({ target }) => {
    setInputValue(target.value);
    inputFilter(target.value, data);
  };

  return (
    <div className='filter'>
      <MySelect changeFilter={changeFilter} data={data} />
      <input
        className='filter-input'
        type='text'
        placeholder='Название'
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
