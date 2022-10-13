import { Contact, ContactWithId as ContactWithId } from '../../models/contact';
import styles from './contacts-list-item.module.css';

type Props = {
    contact: Contact,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
};

const ContactsListItem: React.FC<Props> = ({ contact, onClick }) => {

    return (
        <div className={styles.item_cont} onClick={onClick}>
            <div className={styles.photo}>
                <img className={styles.photo__image} src={contact.photo} />
            </div>
            <div className={styles.user_data}>
                <label className={styles.user_data__label}>
                    Имя
                </label>
                <p className={styles.user_data__value}>{contact.name}</p>
                <label className={styles.user_data__label}>
                    Телефон
                </label>
                <p className={styles.user_data__value}>{contact.phone}</p>
                <label className={styles.user_data__label}>
                    Email
                </label>
                <p className={styles.user_data__value}>{contact.email}</p>
                <label className={styles.user_data__label}>
                    День рождения
                </label>
                <p className={styles.user_data__value}>{contact.birthday}</p>
                <label className={styles.user_data__label}>
                    Адрес
                </label>
                <p className={styles.user_data__value}>{contact.address}</p>
            </div>
        </div>
    )
};

export default ContactsListItem;