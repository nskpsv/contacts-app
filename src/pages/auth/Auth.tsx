import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser, selectAuthState, selectIsLogin, selectLogin, selectPassword, updateLogin, updatePassword } from '../../state/authSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import styles from './Auth.module.css';

const Auth = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { login, password, isLogin } = useAppSelector(selectAuthState);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
       
       dispatch(checkUser({login, password}));
    };


    useEffect(() => {
        if (isLogin) {
        navigate('/');
        }
    }, [isLogin]);
    
/* ClassNames */
    return (
        <div className={styles.auth_cont}>
            <header className={styles.header}>
                <h1>Auth</h1>
            </header>
            <main className={styles.main_cont}>
                <form name='login' onSubmit={handleSubmit}>
                    <label className={styles.field_label}>
                        Логин:{' '}
                        <input 
                        className={styles.field}
                        value={login}
                        onChange={(e) => dispatch(updateLogin(e.target.value))}
                        type='text'
                        name='login'
                        autoFocus />
                    </label>
                    <label className={styles.field_label}>
                        Пароль:{' '}
                        <input
                        className={styles.field}
                        value={password}
                        onChange={(e) => dispatch(updatePassword(e.target.value))}
                        type='password'
                        name='password' />
                    </label>
                    <button className={styles.submit} type='submit'>Войти</button>
                </form>
            </main>
        </div>
    )
};

export default Auth;
