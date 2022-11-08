import styles from './contact-form.module.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Contact } from '../../../models/contact';
import editIco from '../../../resources/edit.svg';
import ContactFormState from '../../../classes/contact-form-state';
import validateForm from './form-validators';

type Props = {
    contact: Contact | null,
    onCancel?: Function,
    onSubmit: Function
};



const ContactForm: React.FC<Props> = ({ contact, onCancel = null, onSubmit = null }) => {

    const [state, setState] = useState<ContactFormState>(new ContactFormState());

    const cancelHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onCancel && onCancel();
    };

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (validateForm(state)) {
            onSubmit && onSubmit();
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
                        className={styles.form__input}
                        type='text'
                        name='name'
                        placeholder='Имя'
                        value={state.name.value}
                        onChange={(e) => setState({
                            ...state, name: {
                                ...state.name, value: e.target.value 
                            }
                        })}
                        required />
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor='phone'>Телефон</label>
                    <input
                        className={styles.form__input}
                        type='tel'
                        name='phone'
                        placeholder='+7 (___) ___-__-__'
                        pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                        value={state.phone.value}
                        onChange={(e) => setState({
                            ...state, phone: {
                                ...state.phone, value: e.target.value 
                            }
                        })}
                        required />
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
                        onChange={(e) => setState({
                            ...state, birthday: {
                                ...state.birthday, value: e.target.value 
                            }
                        })} />
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor={'email'}>Email</label>
                    <input
                        className={styles.form__input}
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={state.email.value}
                        onChange={(e) => setState({
                            ...state, email: {
                                ...state.email, value: e.target.value 
                            }
                        })} />
                </div>
                <div className={styles.form__field}>
                    <label className={styles.form__label} htmlFor='address'>Адрес</label>
                    <input
                        className={styles.form__input}
                        type='text'
                        name='address'
                        placeholder='Адрес'
                        value={state.address.value}
                        onChange={(e) => setState({
                            ...state, address: {
                                ...state.address, value: e.target.value 
                            }
                        })} />
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