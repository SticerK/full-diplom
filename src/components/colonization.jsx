import Section from './common/section';
import Card from './common/card';
import FullInfo from './common/fullInfo';
import Snake from './common/snake';
import Filter from './common/filter';
import { useEffect, useState } from 'react';

const Colonization = ({ data, inputFilter, changeFilter, filteredCard }) => {
  const [correctValueInput, setCorrectValueInput] = useState();
  const finalData = filteredCard ? filteredCard : data;

  useEffect(() => {
    filteredCard ??
      setCorrectValueInput(
        Object.keys(finalData).every((item) => data[item].length > 0)
      );
  }, [finalData]);

  return (
    <div className='container'>
      <Filter changeFilter={changeFilter} inputFilter={inputFilter} />
      {correctValueInput ? (
        <>
          <Snake />
          {Object.keys(finalData).map((item) => (
            <Section key={item}>
              {item === Object.keys(finalData)[0] && (
                <div className='title'>Хоочешь создать новый мир?</div>
              )}
              {finalData[item].map((d, index) => (
                <Card data={d} index={index} key={d.id} />
              ))}
            </Section>
          ))}
        </>
      ) : (
        <h1 style={{ color: 'white' }}>По вашему запросу ничего не найдено!</h1>
      )}
    </div>
  );
};

export default Colonization;
