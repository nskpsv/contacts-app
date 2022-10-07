import { Contact } from '../../models/contact';
import styles from './contact-editor.module.css';

type Props = {
    contact: Contact | null
}

const ContactEditor: React.FC<Props> = ({ contact }) => {

    return (
        <div className={styles.editor_cont}>
            <header className={styles.hesder}>
                {contact ? `Редактирование контакта ${contact.name}` : 'Добавление контакта'}
            </header>
            <form className={styles.form} name='contact'>
                <input
                    className={styles.form__field}
                    type='text'
                    name='name'
                    placeholder='Имя'
                    value={contact ? contact.name : undefined}
                    required
                    autoFocus />
                <input
                    className={styles.form__field}
                    type='tel'
                    name='phone'
                    placeholder='+7(___)___-__-__'
                    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                    value={contact ? contact.phone : undefined}
                    required />
                <input
                    className={styles.form__field}
                    type='date'
                    name='birthday'
                    placeholder='День рождения'
                    value={contact ? contact.birthday : undefined} />
                <input
                    className={styles.form__field}
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={contact ? contact.email : undefined} />
                <input
                    className={styles.form__field}
                    type='text'
                    name='address'
                    placeholder='Адрес'
                    value={contact ? contact.address : undefined} />
                <button type='submit'>{contact ? 'Изменить' : 'Добавить'}</button>
            </form>
        </div>

    )
};

export default ContactEditor;