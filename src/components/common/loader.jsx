import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={1600}
    height={850}
    viewBox='0 0 1600 850'
    backgroundColor='#252525'
    foregroundColor='#292929'
    {...props}>
    <rect x='0' y='0' rx='0' ry='0' width='1600' height='850' />
  </ContentLoader>
);

export default Loader;
