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
import { Field } from '../field/field';
import { Input } from '../input/input';

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
                <Field error={state.name.error} label='Имя' labelFor='name'>
                    <Input
                    isError={!!state.name.error }
                    type='text'
                    name='name'
                    value={state.name.value}
                    onChange={(e) => fieldChangeHandler('name', e.target.value)}
                    />
                </Field>
                <Field label='Телефон' labelFor='phone'>
                    <Input
                    type='tel'
                    name='phone'
                    value={state.phone.value}
                    onChange={(e) => fieldChangeHandler('phone', e.target.value)}
                     />
                </Field>
                <Field label='Дата рождения' labelFor='birthday'>
                    <Input
                    id={styles.date}
                    type='date'
                    name='birthday'
                    value={state.birthday.value}
                    onChange={(e) => fieldChangeHandler('birthday', e.target.value)}
                    />
                </Field>
                <Field label='Email' labelFor='email'>
                    <Input
                    type='email'
                    name='email'
                    value={state.email.value}
                    onChange={(e) => fieldChangeHandler('email', e.target.value)}
                    />
                </Field>
                <Field label='Адрес' labelFor='address'>
                    <Input
                    type='text'
                    name='address'
                    value={state.address.value}
                    onChange={(e) => fieldChangeHandler('address', e.target.value)}
                    />
                </Field>
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