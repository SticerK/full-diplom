import { useHistory, useParams } from 'react-router-dom';
import MyButton from '../UI/MyButton';
import Section from '../UI/section';
import useBasket from '../hooks/useBasket';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { RootState } from '../../store/store';
import { Product } from '../../redux/basketSlice';

const FullInfo: React.FC = () => {
  const { id }: { id: string } = useParams();
  const product = useSelector((state: RootState) => state.changeData.data) as Product[];
  const dispatch = useDispatch();

  let findCard = {} as Product;
  product.forEach((item) => {
    if (String(item.id) === id) findCard = item;
  });
  const { go } = useHistory();

  const { inBasket, addProduct } = useBasket(findCard);
  return (
    <div className='container'>
      <Section>
        <div className='fullInfo'>
          <img src={findCard.url} alt='' className='fullInfo-image' />
          <div className='fullInfo-text'>
            <div className='fullInfo-title'>{findCard.title}</div>
            <div className='fullInfo-descr'>{findCard.descr}</div>
            {findCard.peculiarities && (
              <>
                <p>Если ты не боишься:</p>
                <ul className='altCard-lists'>
                  {findCard.peculiarities.map((item) => (
                    <li className='altCard-list'>{item}</li>
                  ))}
                </ul>
              </>
            )}
            <div className='fullInfo-footer'>
              <MyButton func={() => go(-1)}>Назад</MyButton>
              <MyButton isValid={inBasket} func={addProduct}>
                {inBasket ? 'В корзине' : 'Купить'}
              </MyButton>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FullInfo;
