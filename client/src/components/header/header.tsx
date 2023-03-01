import Navigation from './navigation';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className='container' style={{ marginTop: '0px' }}>
      <header className='header'>
        <Navigation />
      </header>
    </div>
  );
};

export default Header;
