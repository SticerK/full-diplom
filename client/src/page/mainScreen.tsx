import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainScreen: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const children = titleRef?.current?.children;

    if (children) {
      setTimeout(() => children[0].classList.remove('cover'), 300);
      //@ts-ignore
      setTimeout(() => (children[1].style.cssText = 'transform: translateX(0); opacity:1'), 500);
      setTimeout(() => children[2].classList.remove('cover'), 1000);
    }
  }, [titleRef]);

  return (
    <div className='main-screen'>
      <div className='main-screen-title' ref={titleRef}>
        <div className='main-screen-title_1 cover'> Здравствуй!</div>
        <span className='main-screen-title_2'>Хочешь покинуть планету?</span>
        <span className='main-screen-title_3 cover'>
          Тебе{' '}
          <Link to={'/catalog'} className='main-screen-title-btn'>
            сюда!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default MainScreen;
