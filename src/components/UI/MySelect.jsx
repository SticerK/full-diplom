import { useState } from 'react';
import { AiOutlineCaretDown, AiFillCaretUp } from 'react-icons/ai';

const MySelect = ({ newTask, setNewTask }) => {
  const [toggleSelect, setToggleSelect] = useState(false);
  const [value, setVatue] = useState();

  const sortBy = ['По возрастанию цены', 'По уменьшению цены', 'По названию'];

  const handleCategories = ({ target }) => {
    setVatue(() => target.textContent);
    setNewTask({ ...newTask, category: target.textContent });
  };

  return (
    <div
      className='MySelect'
      onClick={() => setToggleSelect((prevState) => !prevState)}>
      {value ? <p>{value}</p> : 'Категории'}
      {toggleSelect ? (
        <div className='MySelect-option-container'>
          {sortBy.map((item, index) => (
            <div
              className='MySelect-option'
              onClick={handleCategories}
              key={item}>
              <p>{item}</p>
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
