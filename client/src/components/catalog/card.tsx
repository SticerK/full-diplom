import MyButton from '../UI/MyButton';
import { useHistory } from 'react-router-dom';

import { DataProps } from './altCard';
import React from 'react';

const Card: React.FC<DataProps> = ({ data }) => {
  const { push } = useHistory();

  return (
    <div className={`card `}>
      <img className='card-img' src={data.url}></img>
      <div className='card-text'>
        <div className='card-title'>{data.title}</div>
        <div className='card-description'>{data.shDescr}</div>
        <div className='card-description'>{data.price} у.е</div>
        <MyButton className={'btn-card'} func={() => push(`/catalog/${data.id}`)}>
          Подробнее
        </MyButton>
      </div>
    </div>
  );
};

export default Card;
