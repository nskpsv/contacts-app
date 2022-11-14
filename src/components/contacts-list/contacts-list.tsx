import { Contact } from '../../models/contact';
import { selectAuthStatus } from '../../state/authSlice';
import { selectContactsStatus, selectList } from '../../state/contactsSlice';
import { useAppSelector } from '../../state/hooks';
import ContactsListItem from '../contacts-list-item/contacts-list-item';
import styles from './contacts-list.module.css';

type Props = {
    list: Contact[]
    onItemClick?: Function
    isFetching?: boolean
}

const ContactsList: React.FC<Props> = ({ list, onItemClick, isFetching = false }) => {

    const contactsStatus = useAppSelector(selectContactsStatus);
    const authStatus = useAppSelector(selectAuthStatus);
    const contacts = useAppSelector(selectList);

    if ((!list.length && contactsStatus === 'pending') || authStatus === 'pending') {
        return (
            <div className={styles.list}>
                <p className={styles.error}>Загрузка контактов...</p>
            </div>
        )
    }

    if (!contacts.length && contactsStatus === 'fulfilled' && authStatus === 'fulfilled') {
        return (
            <div className={styles.list}>
                <p className={styles.error}>У вас пока нет контактов.</p>
            </div>
        )
    }

    if (contactsStatus === 'rejected') {
        return (
            <div className={styles.list}>
                <p className={styles.error}>При загрузке контактов произошёл сбой.</p>
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