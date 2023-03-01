import BasketItem from './basketItem';
import Section from '../UI/section';
import styles from './basket.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import basketURL from '../../assets/basket.png';
import MyButton from '../UI/MyButton';
import React from 'react';
import { RootState } from '../../store/store';
import { useHistory } from 'react-router-dom';
import { User, buyItemsUser } from '../../redux/authSlice';
import { Product, clearBasket } from '../../redux/basketSlice';
import Confirm from '../UI/confirm';

const Basket: React.FC = () => {
  const history = useHistory();
  const products = useSelector((state: RootState) => state.basket.products);
  const isAuth = useSelector((state: RootState) => state.authSlice.isAuth);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [allCost, setAllCost] = React.useState(0);
  const dispath = useDispatch();

  const basket = useSelector((state: RootState) => state.basket.products);
  const user = useSelector((state: RootState) => state.authSlice.user) as User;
  const cost = products.reduce((acc, item) => {
    //@ts-ignore
    acc += item.items * item.price;
    return acc;
  }, 0);

  const buyProd = () => {
    if (!isAuth) {
      history.push('/login');
    }
    setOpenModal(true);
    setAllCost(
      products.reduce((acc: number, item: Product) => {
        acc = acc + item.price;
        return acc;
      }, 0)
    );
  };

  const confirm = () => {
    setOpenModal(false);
    const cost = basket.reduce((acc: any, item) => {
      acc += item.price;
      return acc;
    }, 0);
    if (cost > user.cash) return alert('У вас недостаточно средств на счету');
    alert('Вы купили');
    //@ts-ignore
    dispath(buyItemsUser({ cost, user }));
    dispath(clearBasket());
  };

  return (
    <div className='container'>
      <Section>
        <div className={styles.content}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.basket}>
              {products.length ? (
                products.map((product) => <BasketItem {...product} key={product.id} />)
              ) : (
                <div className={styles.empty}>Тут ничего нет</div>
              )}
            </div>
            <div className={styles.picture}>
              <img src={basketURL} />
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.btns}>
              <Confirm open={openModal} onOpen={setOpenModal}>
                <h1>Подтвердите вашу покупку на {allCost}</h1>
                <MyButton func={confirm}>Подтвердить</MyButton>
              </Confirm>
              <MyButton func={() => dispatch(clearBasket())}>Очистить</MyButton>
              <MyButton func={() => buyProd()}>Купить</MyButton>
            </div>
            <p>Итого: {cost}</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Basket;
