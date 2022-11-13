import { Contact } from '../../models/contact';
import ContactForm from '../forms/contact-form/contact-form'
import styles from './contact-editor.module.css';

type Props = {
    contact?: Contact | null,
    onCancel: Function
};

const ContactEditor: React.FC<Props> = ({ contact = null, onCancel }) => {
    
    const onSubmit = (data: Contact) => {  
        contact
        ? 
    }
    
    return (
        <div className={styles.editor_container}>
            <header className={styles.header}>
                <h4 className={styles.header__title}>
                    {contact ? `Редактирование контакта` : 'Добавление контакта'}
                </h4>

            </header>
            <ContactForm contact={contact} onCancel={onCancel} onSubmit={onSubmit}/>
        </div>

    )
};

export default ContactEditor;