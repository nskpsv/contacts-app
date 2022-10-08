import { Contact, ContactWithId as ContactWithId } from '../../models/contact';
import styles from './contacts-list-item.module.css';

type Props = {
    contact: Contact,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
};

const ContactsListItem: React.FC<Props> = ({ contact, onClick }) => {

    

    /* const editContact: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick(contact, id);
    }
 */
    return (
        <div className={styles.item_cont} onClick={onClick}>
            <img className={styles.photo} src={contact.photo} />
            <p className={styles.name}>{contact.name}</p>
            <p className={styles.phone}>{contact.phone}</p>
            <p className={styles.email}>{contact.email}</p>
            <p className={styles.birthday}>{contact.birthday}</p>
            <p className={styles.address}>{contact.address}</p>
        </div>
    )
};

export default ContactsListItem;