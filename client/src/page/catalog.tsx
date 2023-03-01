import globalData from '../data/data';
import React, { useEffect } from 'react';
import SubMenu from '../components/submenu/index';
import { useParams } from 'react-router-dom';
import FullInfo from '../components/catalog/fullInfo';
import Loader from '../components/loader';
import Products from '../components/catalog/products';
import { startData } from '../redux/changeDataSlice';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Flight: React.FC = () => {
  const status = useSelector((state: RootState) => state.changeData.status);
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  useEffect(() => {
    //@ts-ignore
    dispatch(startData(globalData.flight as Data));
  }, []);

  if (id) {
    return status === 'pending' ? <Loader /> : <FullInfo />;
  }

  return (
    <>
      <div className='container'>
        <SubMenu />
        {status === 'pending' ? <Loader /> : <Products />}
      </div>
    </>
  );
};

export default Flight;
