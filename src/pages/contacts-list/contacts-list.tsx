import styles from './contacts-list.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { selectAuthState } from '../../state/authSlice';
import { Contact } from '../../models/contact';
import { getContacts, selectContactsState } from '../../state/contactsSlice';
import ContactsListItem from '../../components/contacts-list-item/contacts-list-item';
import Popup from '../../components/popup/popup';
import ContactEditor from '../../components/contact-editor/contact-editor';
import { disableScroll, enableScroll } from '../../utils';


const ContactsList = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userName, userId, isLogin } = useAppSelector(selectAuthState);
    const { error, list, status } = useAppSelector(selectContactsState);

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContact, setPopupContact] = useState<Contact | null>(null);
    const [popupContactId, setPopupContactId] = useState<number | null>(null);

    const showPopup = (contact: Contact, id: number) => {
        disableScroll();
        setPopupContact(contact);
        setPopupContactId(id);
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setPopupVisible(false);
        setPopupContact(null);
        setPopupContactId(null);
        enableScroll();
    };

    useEffect(() => {
        !isLogin ? navigate('/login') : dispatch(getContacts(userId!));
    }, [isLogin])

    return (
        <div className={styles.list_cont}>
            <Popup visible={popupVisible} onClose={() => { hidePopup() }}>
                <ContactEditor contact={popupContact} onSubmit={() => { }} />
            </Popup>
            <header className={styles.header}>
                <h1>{`Здравствуйте ${userName}`}</h1>
            </header>
            <div className={styles.list}>
                {
                    list.length
                        ? list.map((contact, id) => <ContactsListItem key={id} contact={contact} onClick={() => showPopup(contact, id)} />)
                        : <p className={styles.error}>У вас пока нет контактов.</p>
                }
            </div>
        </div>
    )
};

export default ContactsList;