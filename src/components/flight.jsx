import Section from './common/section';
import Card from './common/card';
import data from '../data/data';
import FullInfo from './common/fullInfo';
import Snake from './common/snake';
import Filter from './common/filter';
import { useState } from 'react';

const Flight = ({ match }) => {
  const [sortedData, setSortedData] = useState([]);

  const path = match.params.CardID;

  if (path) {
    const [findCard] = Object.keys(data).map((item) =>
      data[item].find((prop) => prop.id == path)
    );
    return <FullInfo {...findCard} />;
  }

  return (
    <>
      <Snake />
      <div className='container'>
        <Filter />
        {Object.keys(data).map((item) => (
          <Section key={item}>
            {item === Object.keys(data)[0] && (
              <div className='title'>Отткрытый космос ждет тебя!</div>
            )}
            {data[item].map((d, index) => (
              <Card data={d} index={index} key={d.id} />
            ))}
          </Section>
        ))}
      </div>
    </>
  );
};

export default Flight;
