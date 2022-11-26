import { useState } from 'react';
import { AiOutlineCaretDown, AiFillCaretUp } from 'react-icons/ai';

const MySelect = ({ changeFilter, data }) => {
  const [toggleSelect, setToggleSelect] = useState(false);
  const [value, setVatue] = useState();

  const sortBy = [
    { value: 'price', title: 'По возрастанию цены', sort: 'asc' },
    { value: 'price', title: 'По уменьшению цены', sort: 'desc' },
    { value: 'title', title: 'По названию', sort: 'asc' },
  ];

  const handleCategories = (item) => {
    setVatue(item.title);
    changeFilter(item, data);
  };

  return (
    <div
      className='MySelect'
      onClick={() => setToggleSelect((prevState) => !prevState)}>
      {value ? <p>{value}</p> : 'Категории'}
      {toggleSelect ? (
        <div className='MySelect-option-container'>
          {sortBy.map((item) => (
            <div
              className='MySelect-option'
              onClick={() => handleCategories(item)}
              key={item.title}>
              {item.title}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      {toggleSelect ? <AiFillCaretUp /> : <AiOutlineCaretDown />}
    </div>
  );
};

export default MySelect;
