import { Contact } from '../../models/contact';
import styles from './contacts-list-item.module.css';

type Props = {
    contact: Contact
};

const ContactsListItem: React.FC<Props> = ({ contact }) => {

    const getRandomPhoto = (): string => {
        enum gender {'man', 'woman'};
        return `https://randomuser.me/api/portraits/${gender[Math.random() * 1]}/${Math.random() * 90}.jpg` ;
    };

    return (
        <div className={styles.item_cont}>
            <img className={styles.photo} src={getRandomPhoto()} />
            <p className={styles.name}>{contact.name}</p>
            <p className={styles.phone}>{contact.phone}</p>
            <p className={styles.email}>{contact.email}</p>
            <p className={styles.birthday}>{contact.birthday}</p>
            <p className={styles.address}>{contact.address}</p>
        </div>
    )
};

export default ContactsListItem;