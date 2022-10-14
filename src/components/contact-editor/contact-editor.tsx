import { useEffect, useState } from 'react';
import { Contact } from '../../models/contact';
import styles from './contact-editor.module.css';

type Props = {
    contact: Contact,
    onSubmit: Function
}

const ContactEditor: React.FC<Props> = ({ contact }) => {
    const [formData, setFormData] = useState(contact);

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...contact,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

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
                    value={formData.name}
                    onChange={handleChangeForm}
                    required
                    autoFocus />
                <input
                    className={styles.form__field}
                    type='tel'
                    name='phone'
                    placeholder='+7 (___) ___-__-__'
                    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                    value={formData.phone}
                    onChange={handleChangeForm}
                    required />
                <input
                    className={styles.form__field}
                    type='date'
                    name='birthday'
                    placeholder='День рождения'
                    value={formData.birthday}
                    onChange={handleChangeForm} />
                <input
                    className={styles.form__field}
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChangeForm} />
                <input
                    className={styles.form__field}
                    type='text'
                    name='address'
                    placeholder='Адрес'
                    value={formData.address}
                    onChange={handleChangeForm} />
                <button type='submit'>{contact ? 'Изменить' : 'Добавить'}</button>
            </form>
        </div>

    )
};

export default ContactEditor;