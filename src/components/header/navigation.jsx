import { Link } from 'react-router-dom';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navigation = React.memo(() => {
  const navigationLink = [
    { link: 'Главная', path: '/main', id: '1' },
    { link: 'Полет', path: '/flight', id: '2' },
    { link: 'Колонизация', path: '/colonization', id: '3' },
    { link: 'Новости', path: '/туцы', id: '4' },
  ];

  return (
    <nav className='nav'>
      <Link className='logo' to='/main'>
        SPACE
      </Link>
      <div className='menu'>
        {navigationLink.map((link) => (
          <Link key={link.id} to={link.path} className='nav-link'>
            {link.link}
          </Link>
        ))}
        <Link to={'/basket'}>
          <AiOutlineShoppingCart
            className='nav-link'
            style={{ fontSize: '20px' }}
          />
        </Link>
      </div>
    </nav>
  );
});

export default Navigation;
