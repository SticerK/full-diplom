import React, { useEffect, useState } from 'react';

const Title = ({ children }) => {
  const [titleEffect, setTitleEffect] = useState('');
  let iter = 0;

  useEffect(() => {
    setTimeout(() => {
      const intervalID = setInterval(() => {
        setTitleEffect((prev) => prev + children[iter]);
        ++iter;
        if (iter === children.length - 1) clearInterval(intervalID);
      }, 80);
    }, 1000);
  }, []);
  return <div className='title'>{titleEffect}</div>;
};

export default Title;
