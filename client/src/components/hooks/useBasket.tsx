import { useDispatch, useSelector } from 'react-redux';
import { Product, changeBasket } from '../../redux/basketSlice';
import { useState, useEffect } from 'react';
import { RootState } from '../../store/store';

const useBasket = (data: Product) => {
  const dispatch = useDispatch();
  const [inBasket, setInBasket] = useState(false);
  const basket = useSelector((state: RootState) => state.basket.products);

  useEffect(() => {
    setInBasket(basket.some((item) => item.id === data.id));
  }, []);

  const addProduct = () => {
    dispatch(changeBasket({ ...data, items: 1 }));
    setInBasket(true);
  };

  return { inBasket, addProduct };
};

export default useBasket;
