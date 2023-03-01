import { Link } from 'react-router-dom';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './header.module.scss';

type NavigationLinks = {
  link: string;
  path: string;
  id: string;
};

const Navigation: React.FC = React.memo(() => {
  const basket = useSelector((state: RootState) => state.basket.products);
  const isAuth = useSelector((state: RootState) => state.authSlice.isAuth);

  const navigationLink: NavigationLinks[] = [
    { link: 'Главная', path: '/', id: '1' },
    { link: 'Каталог', path: '/catalog', id: '2' },
    { link: 'Новости', path: '/news', id: '3' },
  ];

  return (
    <nav className='nav'>
      <Link className='logo' to='/'>
        SPACE
      </Link>
      <div className='menu'>
        {navigationLink.map((link) => (
          <Link key={link.id} to={link.path} className='nav-link'>
            {link.link}
          </Link>
        ))}
        <Link to={'/basket'} className={'basket-link'}>
          {basket.length ? <div className='basket-items'>{basket.length}</div> : null}
          <AiOutlineShoppingCart className='nav-link' style={{ fontSize: '20px' }} />
        </Link>
        <Link to={'/login'} className={styles.enter}>
          {isAuth ? 'Личный кабинет' : 'Войти'}
        </Link>
      </div>
    </nav>
  );
});

export default Navigation;
