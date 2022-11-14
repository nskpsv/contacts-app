import styles from './contact-form.module.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Contact } from '../../../models/contact';
import editIco from '../../../resources/edit.svg';
import { ContactFormState } from '../../../classes/contact-form-state';
import validateForm from './form-validators';
import classNames from 'classnames/bind';
import preloader from '../../../resources/preloader.svg';
import { ContactObj } from '../../../classes/contact';
import { useAppSelector } from '../../../state/hooks';
import { selectUserId } from '../../../state/authSlice';
import { selectContactsStatus } from '../../../state/contactsSlice';

type Props = {
    contact?: Contact,
    onCancel?: Function,
    onDelete?: Function,
    onSubmit: Function
};



const ContactForm: React.FC<Props> = ({ contact, onCancel = null, onSubmit, onDelete = null }) => {

    const [state, setState] = useState(new ContactFormState());
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const userId = useAppSelector(selectUserId);
    const status = useAppSelector(selectContactsStatus);

    const cx = classNames.bind(styles);

    const getContact = (): Contact => {
        return new ContactObj(
            state.name.value,
            state.email.value,
            state.phone.value,
            state.address.value,
            state.birthday.value,
            state.photo.value,
            userId,
            contact?.id
        )
    };

    const fieldChangeHandler = (key: keyof ContactFormState, newValue: string) => {
        setState({
            ...state,
            [key]: {
                ...state[key],
                value: newValue
            }
        })
    };

    const cancelHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onCancel && onCancel();
    };

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (validateForm(state, setState)) {
            setSubmitting(true);
            onSubmit && onSubmit(getContact());
        }
    };

    const deleteHandler: MouseEventHandler<HTMLButtonElement> = (e) => {        
        e.preventDefault();
        setDeleting(true);
        onDelete && onDelete(contact?.id);
    };

    useEffect(() => {
        setState(new ContactFormState(contact));
    }, [contact]);

    useEffect(() => {
        console.log(status);
        
        if (status === 'fulfilled' || status === 'rejected') {
            setDeleting(false);
            setSubmitting(false);
        }
    }, [status])

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
                    <button type='submit' className={styles.form__submit_button} disabled={status === 'pending'}>
                        {submitting
                            ? <img src={preloader} />
                            : 'Сохранить'
                        }
                    </button>
                    {
                        onCancel &&
                        <button className={styles.form__cancel_button} onClick={cancelHandler} disabled={status === 'pending'}>отмена</button>
                    }
                    {
                        onDelete && contact?.id &&
                        <button className={styles.form__delete_button} onClick={deleteHandler} disabled={status === 'pending'}>
                            {deleting
                                ? <img src={preloader} />
                                : 'удалить'
                            }
                        </button>
                    }
                </div>
            </form>
        </>
    );
};

export default ContactForm;