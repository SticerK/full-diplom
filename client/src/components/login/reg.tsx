import React from 'react';
import styles from './login.module.scss';
import MyButton from '../UI/MyButton';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { User, fetchUserReg } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Profile from '../profile';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const dispath = useDispatch();
  const history = useHistory();

  const isAuth = useSelector((state: RootState) => state.authSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: 'onBlur' });

  //@ts-ignore
  const onSubmit = (value) => {
    //@ts-ignore
    dispath(fetchUserReg(value));
  };
  if (isAuth.isAuth) {
    if (isAuth.user !== null) {
      history.push(`profile/${isAuth.user._id}`);
    }
    return <Profile />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <h1 className={styles.title}>Регистрация</h1>
      <input
        className={styles.input}
        placeholder='Введите имя'
        type='text'
        {...register('firstName', { required: 'Это поле обязательно для заполнения' })}
      />
      <div className={styles.error}>{errors.firstName ? errors.firstName.message : ''}</div>
      <input
        className={styles.input}
        placeholder='Введите фамилию'
        type='text'
        {...register('lastName', { required: 'Это поле обязательно для заполнения' })}
      />
      <div className={styles.error}>{errors.lastName ? errors.lastName.message : ''}</div>
      <input
        className={styles.input}
        placeholder='Введите почтовый ящик'
        type='email'
        {...register('email', { required: 'Это поле обязательно для заполнения' })}
      />
      <div className={styles.error}>{errors.email ? errors.email.message : ''}</div>
      <input
        className={styles.input}
        placeholder='Введите пароль'
        type='password'
        {...register('password', { required: 'Это поле обязательно для заполнения' })}
      />
      <div className={styles.error}>{errors.password ? errors.password.message : ''}</div>
      <input
        className={styles.input}
        placeholder='Введите пароль повторно'
        type='password'
        {...register('_password', { required: 'Это поле обязательно для заполнения' })}
      />
      <div className={styles.error}>{errors._password ? errors._password.message : ''}</div>
      <MyButton type='submit' func={() => console.log('hi')}>
        Создать
      </MyButton>
    </form>
  );
};

export default Register;
