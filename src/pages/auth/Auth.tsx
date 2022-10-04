import { FormEvent, useState } from 'react';
import auth from '../../api/auth';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import styles from './auth.module.css';

const Auth = () => {

    const dispatch = useAppDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
            
        auth.login({login, password});
    };
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
                        onChange={(e) => setLogin(e.target.value)}
                        type='text'
                        name='login'
                        autoFocus />
                    </label>
                    <label className={styles.field_label}>
                        Пароль:{' '}
                        <input
                        className={styles.field}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
