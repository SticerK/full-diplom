import Header from './header/header';
import { Switch, Route } from 'react-router-dom';
import MainScreen from '../page/mainScreen';
import Flight from '../page/flight';
// import Colonization from './colonization';

import { useEffect, useState } from 'react';
import lodash from 'lodash';

const MainPage = () => {
  const [data, setData] = useState({});
  const [filteredCard, setFilteredCard] = useState();
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    fetch('https://63823285281f14ffefa2b344.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setData(...data);
        setIsLoader(false);
      });
  }, []);

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
        <Route
          path={'/flight/:CardID?'}
          render={() => (
            <Flight
              data={isLoader ? {} : data.flight}
              changeFilter={changeFilter}
              inputFilter={inputFilter}
              filteredCard={filteredCard}
              isLoader={isLoader}
            />
          )}></Route>
        {/* <Route
          path={'/colonization/:CardID?'}
          render={() => (
            <Colonization
              data={data.colonization}
              changeFilter={changeFilter}
              inputFilter={inputFilter}
              filteredCard={filteredCard}
            />
          )}></Route> */}
        <Route path={'/'} component={MainScreen}></Route>
      </Switch>
    </>
  );
};

export default MainPage;
