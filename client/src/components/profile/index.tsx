import React from 'react';
import MyButton from '../UI/MyButton';
import { useDispatch } from 'react-redux';
import { User, logout, updateUser, deleteUser } from '../../redux/authSlice';
import { useHistory, useParams } from 'react-router-dom';
import Section from '../UI/section';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './profile.module.scss';
import { CSSTransition } from 'react-transition-group';
import Confirm from '../UI/confirm';
import { addCash } from '../../redux/authSlice';
import avatar from '../../assets/avatar.png';

const Profile: React.FC = () => {
  const [modal, setModal] = React.useState(false);
  const [change, setChange] = React.useState(false);
  //@ts-ignore
  const { id } = useParams();
  const dispath = useDispatch();
  const history = useHistory();
  const userData = useSelector((state: RootState) => state.authSlice.user) as User;
  const exit = () => {
    dispath(logout());
    history.push('/');
  };

  const update = () => {
    setChange(true);
    setTimeout(() => setChange(false), 3000);
    //@ts-ignore
    dispath(updateUser({ userData, id }));
  };

  const handleDelete = () => {
    const ans = window.confirm('Вы действительно хотите удалить аккаунт?');

    if (ans) {
      //@ts-ignore
      dispath(deleteUser({ id, userData }));
      history.push('/');
    }
  };

  const [cash, setCash] = React.useState(0);

  const handleCash = () => {
    //@ts-ignore
    dispath(addCash(cash));
    setModal(false);
  };

  return (
    <div className='container'>
      <Section>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.fullName}>
              {userData.firstName} {userData.lastName}
            </div>
            <div className={styles.email}>{userData.email}</div>
            <div className={styles.cash}>На вашем счету: {userData.cash}</div>
            <CSSTransition in={modal} timeout={200} classNames={'modalAnimate'} unmountOnExit>
              <Confirm onOpen={setModal} open={modal}>
                <div className={styles.titleModal}>Введите сумму:</div>
                <input
                  type='text'
                  className={styles.inputCash}
                  value={cash}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCash(Number(e.target.value))
                  }
                />
                <MyButton func={handleCash}>Пополнить</MyButton>
              </Confirm>
            </CSSTransition>
            <MyButton func={() => setModal(true)}>Пополнить</MyButton>
          </div>
          <div className={styles.avatar}>
            {' '}
            <img src={avatar} alt='Аватар' />
          </div>
        </div>
        <div className={styles.footer}>
          {change && <div className={styles.exp}>Профиль успешно изменен</div>}
          <MyButton func={update}>Сохранить</MyButton>
          <MyButton func={exit}>Выйти</MyButton>
          <MyButton func={handleDelete}>Удалить</MyButton>
        </div>
      </Section>
    </div>
  );
};

export default Profile;
