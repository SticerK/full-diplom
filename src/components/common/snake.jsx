import { useEffect, useRef } from 'react';
const Snake = () => {
  const snakeRef = useRef();

  useEffect(() => {
    setTimeout(() => (snakeRef.current.style.opacity = 1), 2000);
    setTimeout(() => (snakeRef.current.children[0].style.opacity = 1), 2500);
  }, []);

  return (
    <div className='snake' ref={snakeRef}>
      <div className='snake-titles'>
        <div className='snake-title'>Солнечная система</div>
        <div className='snake-title'>Солнечная система</div>
      </div>
    </div>
  );
};

export default Snake;
