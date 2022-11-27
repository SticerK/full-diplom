import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainScreen = () => {
  const titleRef = useRef();

  const mainTitle = () => {
    // const [title_1, title_2, title_3] = titleRef.current.children;
    // setTimeout(() => title_1.classList.remove('cover'), 300);
  };

  useEffect(() => {
    const [title_1, title_2, title_3] = titleRef.current.children;
    console.log(titleRef.current.children);
    setTimeout(() => title_1.classList.remove('cover'), 300);
    setTimeout(
      () => (title_2.style.cssText = 'transform: translateX(0); opacity:1'),
      500
    );
    setTimeout(() => title_3.classList.remove('cover'), 1000);
  }, [titleRef]);

  mainTitle();

  return (
    <div className='main-screen'>
      <div className='main-screen-title' ref={titleRef}>
        <div className='main-screen-title_1 cover'> Здравствуй!</div>
        <span className='main-screen-title_2'>Хочешь покинуть планету?</span>
        <span className='main-screen-title_3 cover'>
          Тебе{' '}
          <Link to={'/flight'} className='main-screen-title-btn'>
            сюда!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default MainScreen;
