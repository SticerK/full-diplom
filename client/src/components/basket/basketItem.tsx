import styles from './basket.module.scss';
import { AiOutlineUp, AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteProduct, changeItems } from '../../redux/basketSlice';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import { Product } from '../../redux/basketSlice';

const BasketItem: React.FC<Product> = ({ title, price, url, id }) => {
  const [items, setItems] = useState(1);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setAnimate(true);
    setTimeout(() => dispatch(deleteProduct(id)), 1000);
  };

  const handleIncrement = () => {
    setItems((p) => p + 1);
  };

  const handleDecrement = () => {
    setItems((p) => {
      if (p > 0) return p - 1;
      return 0;
    });
  };

  useEffect(() => {
    dispatch(changeItems({ id, items }));
  }, [items]);

  return (
    <CSSTransition in={animate} timeout={10000} classNames={'basket'}>
      <div className={styles.container}>
        <img src={url} className={styles.image} />
        <div className={styles.info}>
          <div style={{ width: '200px' }}>{title}</div>
          <p>Количество:</p> <span style={{ width: '20px' }}>{items}</span>
          <div className={styles.change}>
            <div className={styles.changeItem}>
              <AiOutlineUp onClick={handleIncrement} />
            </div>
            <div
              className={styles.changeItem}
              style={{ marginTop: '3px', transform: 'rotate(180deg)' }}>
              <AiOutlineUp onClick={handleDecrement} />
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <p>Цена:</p> <span>{price * items}</span>
        </div>
        <div className={styles.delete}>
          <AiFillDelete onClick={handleDelete} />
        </div>
      </div>
    </CSSTransition>
  );
};

export default BasketItem;
