import MyButton from '../UI/MyButton';
import useBasket from '../hooks/useBasket';
import { useInView } from 'react-intersection-observer';
import { Product } from '../../redux/basketSlice';
import React from 'react';

export interface DataProps {
  data: Product;
  index?: number;
}

const AtlCard: React.FC<DataProps> = ({ data }) => {
  const { inBasket, addProduct } = useBasket(data);
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });
  return (
    <div className={`wrapper ${inView ? '' : 'altAnimate'}`} ref={ref}>
      <div className='altCard-img'>
        <div className='image-container'>
          <img src={data.url} alt='' />
        </div>
      </div>
      <div className='altCard-text'>
        <div className='altCard-title'>{data.title}</div>
        <div className='altCard-descr'>{data.descr}</div>
        {data.peculiarities && (
          <>
            <p>Если ты не боишься:</p>
            <ul className='altCard-lists'>
              {data.peculiarities.map((item, index) => (
                <li className='altCard-list' key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        <MyButton isValid={inBasket} func={addProduct}>
          {inBasket ? 'В корзине' : 'Купить'}
        </MyButton>
      </div>
    </div>
  );
};

export default AtlCard;
