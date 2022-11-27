import Section from '../components/common/section';

import FullInfo from '../components/common/fullInfo';
import Snake from '../components/common/snake';
import Filter from '../components/common/filter';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Loader from '../components/common/loader';
import Title from '../components/common/title';
import Cards from '../components/common/cards';

const Flight = ({ data, inputFilter, changeFilter, filteredCard, isLoader }) => {
  const [correctValueInput, setCorrectValueInput] = useState();
  const path = useParams();
  const finalData = filteredCard ?? data;

  useEffect(() => {
    filteredCard ??
      setCorrectValueInput(Object.keys(finalData).every((item) => data[item].length > 0));
  }, [finalData]);

  if (path.CardID) {
    const [findCard] = Object.keys(data).map((item) =>
      data[item].find((prop) => prop.id == path.CardID)
    );
    return <FullInfo {...findCard} />;
  }

  return (
    <>
      <div className='container'>
        <Filter changeFilter={changeFilter} inputFilter={inputFilter} data={data} />
        {correctValueInput ? (
          <>
            <Snake />
            {isLoader ? (
              <Loader />
            ) : (
              <>
                <Section>
                  <Title>Отткрытый космос ждет тебя!</Title>
                  <Cards items={finalData.sun} />
                </Section>
                <Section>
                  <Cards items={finalData.moon} />
                </Section>
              </>
            )}
          </>
        ) : (
          <h1 style={{ color: 'white' }}>По вашему запросу ничего не найдено!</h1>
        )}
      </div>
    </>
  );
};

export default Flight;
