import Header from './components/header/header';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainScreen from './page/mainScreen';
import Catalog from './page/catalog';
import Basket from './components/basket';
import Login from './components/login/login';
import Register from './components/login/reg';
import News from './components/news/news';
import Profile from './components/profile';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path={'/catalog/:id?'} component={Catalog}></Route>
        <Route path={'/basket'} component={Basket} />
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
        <Route path={'/news/:id?'} component={News}></Route>
        <Route path={'/profile/:id'} component={Profile}></Route>
        <Route path={'/'} component={MainScreen}></Route>
      </Switch>
    </>
  );
};

export default App;
