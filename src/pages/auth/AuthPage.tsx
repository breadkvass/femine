import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import styles from './AuthPage.module.css';
import RegistrationForm from '../../components/forms/RegistrationForm';
import LoginForm from '../../components/forms/LoginForm';

const AuthPage = () => {
  const navigate = useNavigate();

  const [ isLogin, setIsLogin ] = useState(true)

  return (
    <Layout>
      <section className={styles.section}>
        <div className={styles.wavyContainer}>
          { isLogin ?
            <LoginForm navigate={navigate}/> :
            <RegistrationForm navigate={navigate}/>
          }
          <button className={styles.button} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'нет аккаунта? зарегистрироваться' : 'уже есть аккаунт? войти'}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default AuthPage;