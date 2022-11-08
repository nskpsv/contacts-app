import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser, selectAuthState } from '../../state/authSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import styles from './Auth.module.css';
import LoginForm from '../../components/forms/login-form/login-form';
import classNames from 'classnames/bind';

const Auth = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLogin, status, error } = useAppSelector(selectAuthState);
    const cx = classNames.bind(styles);

    const onSubmit = (login: string, password: string) => {
        
        dispatch(checkUser({ login, password }));
    };

    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    return (
        <>
            
            <div className={styles.auth_container}>
            
                <header className={styles.header}>
                    <h1 className={styles.header__title}>Авторизация</h1>
                </header>
                    <span className={cx({error: true, 'error--visible': !!error})}>
                        {error}
                    </span>
                <LoginForm onSubmit={onSubmit} isFetching={status === 'pending'}/>
            </div>
        </>
    )
};

export default Auth;


/* {
    /* status === 'pending'  true &&
    <div className={styles.preloader}>
        <img src={preloader} />
    </div>
} */