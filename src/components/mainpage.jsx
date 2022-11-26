import Header from './header/header';
import { Switch, Route } from 'react-router-dom';
import MainScreen from './mainScreen';
import Flight from './flight';
import Colonization from './colonization';
import Data from '../data/data';
import { useState } from 'react';
import lodash from 'lodash';

const MainPage = () => {
  const [data, setData] = useState(Data);
  const [filteredCard, setFilteredCard] = useState();

  const changeFilter = (value, pageData) => {
    setFilteredCard(
      Object.keys(pageData).reduce((acc, item) => {
        acc[item] = lodash.sortBy(pageData[item], [value.value], [value.sort]);
        return acc;
      }, {})
    );
  };

  const inputFilter = (value, pageData) => {
    if (value === '') return setFilteredCard();
    let res = Object.keys(pageData).reduce((acc, item) => {
      acc[item] = pageData[item].filter((card) => card.title.includes(value));
      return acc;
    }, {});
    setFilteredCard(res);
  };

  return (
    <>
      <Header />
      <Switch>
        <Route path={'/main'} component={MainScreen}></Route>
        <Route
          path={'/flight/:CardID?'}
          render={() => (
            <Flight
              data={data.flight}
              changeFilter={changeFilter}
              inputFilter={inputFilter}
              filteredCard={filteredCard}
            />
          )}></Route>
        <Route
          path={'/colonization/:CardID?'}
          render={() => (
            <Colonization
              data={data.colonization}
              changeFilter={changeFilter}
              inputFilter={inputFilter}
              filteredCard={filteredCard}
            />
          )}></Route>
      </Switch>
    </>
  );
};

export default MainPage;
