import Navigation from './navigation';
import React from 'react';

const Header = React.memo(() => {
  return (
    <header className='header'>
      <div className='container' style={{ marginTop: '0px' }}>
        <Navigation />
      </div>
    </header>
  );
});

export default Header;
