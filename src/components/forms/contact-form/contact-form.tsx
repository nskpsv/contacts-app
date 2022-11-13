import styles from './contact-form.module.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Contact } from '../../../models/contact';
import editIco from '../../../resources/edit.svg';
import { ContactFormState } from '../../../classes/contact-form-state';
import validateForm from './form-validators';
import classNames from 'classnames/bind';
import { ContactObj } from '../../../classes/contact';
import { useAppSelector } from '../../../state/hooks';
import { selectUserId } from '../../../state/authSlice';

type Props = {
    contact: Contact | null,
    onCancel?: Function,
    onSubmit: Function
};



const ContactForm: React.FC<Props> = ({ contact = null, onCancel = null, onSubmit = null }) => {

    const [state, setState] = useState<ContactFormState>(new ContactFormState());
    const cx = classNames.bind(styles);

    const fieldChangeHandler = (key: keyof ContactFormState, newValue: string) => {
        setState({
            ...state,
            [key]: {
                ...state[key],
                value: newValue
            }
        } as ContactFormState)
    };

    const cancelHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onCancel && onCancel();
    };

    const getContact = (): Contact => {
        return new ContactObj(
            state.name.value,
            state.email.value,
            state.phone.value,
            state.address.value,
            state.birthday.value,
            state.photo.value,
            useAppSelector(selectUserId)
        )
    };

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (validateForm(state, setState)) {
            onSubmit && onSubmit(getContact());
        }
    };

    useEffect(() => {
        contact && setState(new ContactFormState(contact));
    }, [contact])

    return (
        <>
            <div className={styles.photo}>
                <div className={styles.photo__editor}>
                    <img src={editIco} />
                </div>
                <img className={styles.photo__image} src={state.photo.value} />
            </div>
            <form className={styles.form} name='contact' onSubmit={submitHandler}>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor='name'>Имя</label>
                    <input
                        className={cx({ form__input: true, 'form__input--error': !!state.name.error })}
                        type='text'
                        name='name'
                        placeholder='Имя'
                        value={state.name.value}
                        onChange={(e) => fieldChangeHandler('name', e.target.value)} />
                    <div className={cx({ error: true, 'error--visible': !!state.name.error })}>
                        <span className={styles.error_message}>{state.name.error}</span>
                    </div>
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor='phone'>Телефон</label>
                    <input
                        className={styles.form__input}
                        type='tel'
                        name='phone'
                        value={state.phone.value}
                        onChange={(e) => fieldChangeHandler('phone', e.target.value)} />
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor='birthday'>Дата рождения</label>
                    <input
                        id={styles.date}
                        className={styles.form__input}
                        type='date'
                        name='birthday'
                        placeholder='День рождения'
                        value={state.birthday.value}
                        onChange={(e) => fieldChangeHandler('birthday', e.target.value)} />
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor={'email'}>Email</label>
                    <input
                        className={styles.form__input}
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={state.email.value}
                        onChange={(e) => fieldChangeHandler('email', e.target.value)} />
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor='address'>Адрес</label>
                    <input
                        className={styles.form__input}
                        type='text'
                        name='address'
                        placeholder='Адрес'
                        value={state.address.value}
                        onChange={(e) => fieldChangeHandler('address', e.target.value)} />
                </div>
                <div className={styles.form__buttons}>
                    <button type='submit' className={styles.form__submit_button}>{contact ? 'изменить' : 'добавить'}</button>
                    <button className={styles.form__cancel_button} onClick={cancelHandler}>отмена</button>
                </div>
            </form>
        </>
    );
};

export default ContactForm;