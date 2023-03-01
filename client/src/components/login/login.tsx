import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.scss';
import MyButton from '../UI/MyButton';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUser } from '../../redux/authSlice';
import { RootState } from '../../store/store';
import { useHistory } from 'react-router-dom';
import Profile from '../profile';

export type formProps = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.authSlice);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({ mode: 'onBlur' });

  //@ts-ignore
  const onSubmit = (value) => {
    //@ts-ignore
    dispatch(fetchUser(value));
  };

  if (profile.isAuth) {
    if (profile.user !== null) {
      history.push(`profile/${profile.user._id}`);
    }
    return <Profile />;
  }
  console.log(profile);

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Личный кабинет</h1>

      <input
        className={styles.input}
        placeholder='Введите email'
        type='email'
        {...register('email', { required: 'Это поле обязательно для заполнения' })}
      />
      <div className={styles.error}>{errors.email ? errors.email.message : ''}</div>
      <input
        className={styles.input}
        placeholder='Введите пароль'
        type='password'
        {...register('password', {
          required: 'Это поле обязательно для заполнения',
          minLength: {
            value: 5,
            message: 'Минимум 5 символов',
          },
        })}
      />
      <div className={styles.error}>{errors.password ? errors.password.message : ''}</div>
      <div className={styles.error}>{profile.message ? profile.message : ''}</div>
      <MyButton type='submit' func={() => null}>
        Войти
      </MyButton>
      <Link to={'/register'} className={styles.reg}>
        Зарегистрироваться
      </Link>
    </form>
  );
};

export default Login;
