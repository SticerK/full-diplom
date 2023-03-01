import styles from './submenu.module.scss';
import Filter from './filter';
import { useState, useRef } from 'react';
import { AiOutlineCaretDown, AiFillCaretUp, AiOutlineSwap } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { setToggleCard } from '../../redux/toggleCardSlice';
import { setActiveData } from '../../redux/changeDataSlice';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import { RootState } from '../../store/store';
import data from '../../data/data';

const menuList = [
  { value: 'Полеты', id: '1', products: 'flight' },
  { value: 'Колонизация', id: '2', products: 'colonization' },
  { value: 'Телескопы', id: '3', products: 'telescope' },
];

const SubMenu: React.FC = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const [activeEl, setActiveEl] = useState(0);

  const toggleCard = useSelector((state: RootState) => state.catalogActiveData.toggleView);
  const dispatch = useDispatch();
  const filterRef = useRef(null);

  const activePath = (index: number, path: string) => {
    setActiveEl(index);
    //@ts-ignore
    dispatch(setActiveData(data[path]));
  };

  return (
    <div className={`${styles.submenu} ${openMenu ? '' : styles.open}`}>
      <div className={styles.svg}>
        <AiOutlineSwap onClick={() => setOpenMenu((p) => !p)} />
      </div>
      {openMenu && (
        <>
          <div className={styles.containerView} style={{ marginTop: '30px' }}>
            <div className={styles.item} onClick={() => dispatch(setToggleCard(1))}>
              Просмотр 1
            </div>
            <div className={styles.item} onClick={() => dispatch(setToggleCard(2))}>
              Просмотр 2
            </div>
            <div className={`${styles.border} ${toggleCard === 2 ? styles.toggle : ''}`}></div>
          </div>
          <ul>
            {menuList.map((item, index) => (
              <li key={item.id} style={{ cursor: 'pointer' }}>
                <a
                  className={activeEl === index ? styles.active : ''}
                  onClick={() => activePath(index, item.products)}>
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.filter} onClick={() => setOpenFilter((prev) => !prev)}>
            Фильтр:{' '}
            <span style={{ marginTop: '3px' }}>
              {openFilter ? <AiFillCaretUp /> : <AiOutlineCaretDown />}
            </span>
          </div>
          <CSSTransition
            unmountOnExit
            classNames={'submenu-animate'}
            ref={filterRef}
            in={openFilter}
            timeout={300}>
            <Filter />
          </CSSTransition>
        </>
      )}
    </div>
  );
};

export default SubMenu;
