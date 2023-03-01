import AtlCard from './altCard';
import Card from './card';
import { useSelector } from 'react-redux';
import { Product } from '../../redux/basketSlice';
import React from 'react';
import { RootState } from '../../store/store';

interface ICard {
  items: Product;
}

const Cards: React.FC<ICard> = ({ items }) => {
  const toggleView = useSelector((state: RootState) => state.catalogActiveData.toggleView);

  return (
    <>
      {toggleView === 1 ? (
        <Card data={items} index={items.id} key={items.id} />
      ) : (
        <AtlCard data={items} key={items.id} />
      )}
    </>
  );
};

export default Cards;
