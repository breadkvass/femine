import { useState, useEffect, FormEvent, ChangeEvent, useCallback, FC } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { registerUserThunk } from '../../utils/api';
import styles from './Form.module.css';

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  email: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
}

type RegistrationFormProps = {
  navigate: NavigateFunction;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ navigate }) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    username: false,
    password: false,
    confirmPassword: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'введите корректный email';
    }
    if (!username.trim() || username.length < 2) {
      newErrors.username = 'имя пользователя должно содержать минимум 2 символа';
    }
    if (password.length < 8) {
      newErrors.password = 'пароль должен содержать минимум 8 символов';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, username, password, confirmPassword]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [validateForm]);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ0-9\s\-_]/g, '');
    setUsername(newValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) return;

    try {
      const resultAction = await dispatch(registerUserThunk({
        email,
        password,
        username,
        role: 'user'
      }));

      if (registerUserThunk.fulfilled.match(resultAction)) {
        setIsSuccessful(true);
        // сброс полей
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setTouched({
          email: false,
          username: false,
          password: false,
          confirmPassword: false
        });
        setSubmitted(false);
        navigate('/community')
      } else {
        setIsSuccessful(false);
      }
    } catch {
      setIsSuccessful(false);
    }
  };

  const handleBlur = (field: keyof TouchedFields) => {
    if (!touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
  };

  const shouldShowError = (field: keyof TouchedFields) => {
    return (submitted || touched[field]) && errors[field];
  };

  if (isSuccessful === true) {
    return (
      <div className={styles.final}>
        <p>Регистрация прошла успешно!</p>
        <p>На ваш email отправлено письмо с подтверждением.</p>
        <button className={styles.button} onClick={() => setIsSuccessful(null)}>
          Хорошо
        </button>
      </div>
    );
  }

  if (isSuccessful === false) {
    return (
      <div className={styles.final}>
        <p>Произошла ошибка при регистрации</p>
        <p>Пожалуйста, попробуйте еще раз.</p>
        <button className={styles.button} onClick={() => setIsSuccessful(null)}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          className={styles.input}
          placeholder="example@mail.com"
        />
        {shouldShowError('email') && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Имя пользователя</label>
        <input
          type="text"
          value={username}
          onChange={handleChangeUsername}
          onBlur={() => handleBlur('username')}
          className={styles.input}
          placeholder="от 2 символов"
        />
        {shouldShowError('username') && <span className={styles.error}>{errors.username}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          className={styles.input}
          placeholder="минимум 8 символов"
        />
        {shouldShowError('password') && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Подтвердите пароль</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          className={styles.input}
        />
        {shouldShowError('confirmPassword') && (
          <span className={styles.error}>{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" className={styles.button} disabled={!isFormValid}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationForm;
