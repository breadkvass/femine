import { useState, useEffect, FormEvent, ChangeEvent, FC } from 'react';
import styles from './Form.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavigateFunction } from 'react-router-dom';
import { loginUserThunk } from '../../utils/api';

type LoginFormProps = {
  navigate: NavigateFunction;
};

const LoginForm: FC<LoginFormProps> = ({ navigate }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [localError, setLocalError] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    const errors: { email?: string; password?: string } = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'введите корректный email';
    }
    if (password.length < 6) {
      errors.password = 'пароль должен быть не короче 6 символов';
    }
    setLocalError(errors);
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(localError).length === 0) {
      dispatch(loginUserThunk({ email, password }))
      .then(() => {
        navigate('/community')
      });
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const shouldShowError = (field: 'email' | 'password') =>
    (submitted || touched[field]) && localError[field];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          className={styles.input}
          placeholder="example@mail.com"
        />
        {shouldShowError('email') && <span className={styles.error}>{localError.email}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          className={styles.input}
          placeholder="минимум 6 символов"
        />
        {shouldShowError('password') && <span className={styles.error}>{localError.password}</span>}
      </div>

      {loading && error && (
        <div className={styles.error} style={{ textAlign: 'center' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        className={styles.button}
        disabled={loading === true || Object.keys(localError).length > 0}
      >
        {loading === true ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;