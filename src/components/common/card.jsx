import { useEffect, useMemo, useRef, useState } from 'react';
import MyButton from '../UI/MyButton';

const Card = ({ data, index }) => {
  const cardRef = useRef();

  setTimeout(() => {
    cardRef.current.classList.remove('card-hide');
  }, 1000 + 100 * index);

  return (
    <div className='card card-hide' ref={cardRef}>
      <img className='card-img' src={data.url}></img>
      <div className='card-text'>
        <div className='card-title'>{data.title}</div>
        <div className='card-description'>{data.descr}</div>
        <div className='card-description'>{data.price} у.е</div>
        <MyButton cn='btn-card' path={`/flight/`} id={data.id}>
          Подробнее
        </MyButton>
      </div>
    </div>
  );
};

export default Card;
<div>Hello</div>;
