import Header from './header/header';
import { Switch, Route } from 'react-router-dom';
import MainScreen from './mainScreen';
import Flight from './flight';

const MainPage = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path={'/main'} component={MainScreen}></Route>
        <Route path={'/flight/:CardID?'} component={Flight}></Route>
      </Switch>
    </>
  );
};

export default MainPage;
