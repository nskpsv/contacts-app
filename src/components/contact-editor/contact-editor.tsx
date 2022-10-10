import { useEffect, useState } from 'react';
import { Contact } from '../../models/contact';
import styles from './contact-editor.module.css';

type Props = {
    contact: Contact | null,
    onSubmit: Function
}

const ContactEditor: React.FC<Props> = ({ contact }) => {
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        setName(contact?.name || '');
        setPhone(contact?.phone || '');
        setBirthday(contact?.birthday || '');
        setEmail(contact?.email || '');
        setAddress(contact?.address || '');
    }, [contact]);

   return (
        <div className={styles.editor_cont} onClick={(e) => e.stopPropagation()}>
            <header className={styles.hesder}>
                {contact ? `Редактирование контакта ${contact.name}` : 'Добавление контакта'}
            </header>
            <form className={styles.form} name='contact'>
                <input
                    className={styles.form__field}
                    type='text'
                    name='name'
                    placeholder='Имя'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus />
                <input
                    className={styles.form__field}
                    type='tel'
                    name='phone'
                    placeholder='+7 (___) ___-__-__'
                    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required />
                <input
                    className={styles.form__field}
                    type='date'
                    name='birthday'
                    placeholder='День рождения'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)} />
                <input
                    className={styles.form__field}
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    className={styles.form__field}
                    type='text'
                    name='address'
                    placeholder='Адрес'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                <button type='submit'>{contact ? 'Изменить' : 'Добавить'}</button>
            </form>
        </div>

    )
};

export default ContactEditor;