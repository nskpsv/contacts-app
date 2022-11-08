import { Contact } from '../../models/contact';
import ContactsListItem from '../contacts-list-item/contacts-list-item';
import styles from './contacts-list.module.css';

type Props = {
    list: Contact[]
    onItemClick?: Function
    isFetching?: boolean
}

const ContactsList: React.FC<Props> = ({ list, onItemClick, isFetching = false }) => {

    if (isFetching) {
        return (
            <div className={styles.list}>
                <p className={styles.error}>Загрузка контактов...</p>
            </div>
        )
    }

    if (!list.length) {
        return (
            <div className={styles.list}>
                <p className={styles.error}>У вас пока нет контактов.</p>
            </div>
        )
    }

    return (
        <div className={styles.list}>
            {
                list.map((contact, id) => <ContactsListItem
                    key={id}
                    contact={contact}
                    onClick={onItemClick ? () => onItemClick(contact) : undefined} />)
            }
        </div>
    )
}

export default ContactsList;