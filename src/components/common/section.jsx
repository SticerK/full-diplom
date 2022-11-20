import React, { useEffect, useState } from 'react';
const Section = ({ children }) => {
  const [titleEffect, setTitleEffect] = useState('');

  useEffect(() => {
    if (children[0]) {
      const titleText = children[0].props.children;
      let iter = 0;

      setTimeout(() => {
        const intervalID = setInterval(() => {
          setTitleEffect((prev) => prev + titleText[iter]);
          ++iter;
          if (iter === titleText.length - 1) clearInterval(intervalID);
        }, 80);
      }, 1000);
    } else return;
  }, []);

  const cloneChildren = React.Children.map(children, (child) => {
    if (child?.props?.className === 'title') {
      return <div className='title'>{titleEffect}</div>;
    }
    return child;
  });

  return <div className='flight-section'>{cloneChildren}</div>;
};

export default Section;
