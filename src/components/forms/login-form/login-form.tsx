import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../state/hooks';
import { validateForm } from './form-validator';
import classNames from 'classnames/bind';
import styles from './login-form.module.css';
import preloader from '../../../resources/preloader.svg';
import { clearError } from '../../../state/authSlice';

type Props = {
    onSubmit: Function
    isFetching: boolean
};

export type LoginFormState = {
    login: {
        error: string | null
        value: string
    }
    password: {
        error: string | null
        value: string
    }
};

const LoginForm: React.FC<Props> = ({ onSubmit, isFetching = false }) => {

    const initialState: LoginFormState = {
        login: {
            error: null,
            value: ''
        },
        password: {
            error: null,
            value: ''
        }
    };
    const [state, setState] = useState(initialState);
    const dispatch = useAppDispatch();
    const cx = classNames.bind(styles);

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();
        dispatch(clearError());
        validateForm(state, setState) && onSubmit(state.login.value, state.password.value);
    };

    return (
        <form className={styles.form} name='login' onSubmit={handleSubmit}>
            <div className={styles.field}>
                <div className={cx({ error: true, 'error--visible': !!state.login.error })}>
                    <span className={styles.error_message}>{state.login.error}</span>
                </div>
                <label className={styles.field__label}>Логин:</label>
                <input
                    className={cx({ field__input: true, 'field__input--error': !!state.login.error })}
                    value={state.login.value}
                    onChange={(e) => setState({ ...state, login: { ...state.login, value: e.target.value } })}
                    type='text'
                    name='login'
                    autoFocus
                    disabled={isFetching} />
            </div>
            <div className={styles.field}>
                <div className={cx({ error: true, 'error--visible': !!state.password.error })}>
                    <span className={styles.error_message}>{state.password.error}</span>
                </div>
                <label className={styles.field__label}>Пароль:</label>
                <input
                    className={cx({ field__input: true, 'field__input--error': !!state.password.error })}
                    value={state.password.value}
                    onChange={(e) => setState({ ...state, password: { ...state.password, value: e.target.value } })}
                    type='password'
                    name='password'
                    disabled={isFetching} />
            </div>
            <button className={styles.submit_button} type='submit' disabled={isFetching}>
                {isFetching
                    ? <img src={preloader} />
                    : 'Войти'
                }
            </button>
        </form>
    )
};

export default LoginForm;