import Section from '../UI/section';
import Cards from './cards';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { RootState } from '../../store/store';
import { Product } from '../../redux/basketSlice';

const Products: React.FC = () => {
  const { data, filter } = useSelector((state: RootState) => state.changeData);

  const finalData: Product[] = filter.length ? filter : data;

  console.log(finalData);

  return (
    <div style={{ width: '100%' }}>
      <Section>
        {finalData.map((item) => (
          <Cards items={item} key={item.id} />
        ))}
      </Section>
    </div>
  );
};

export default Products;
