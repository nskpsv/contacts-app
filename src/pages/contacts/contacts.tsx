import styles from './contacts.module.css';
import Popup from '../../components/popup/popup';
import ContactsList from '../../components/contacts-list/contacts-list';
import ContactEditor from '../../components/contact-editor/contact-editor';
import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { selectAuthState } from '../../state/authSlice';
import { Contact } from '../../models/contact';
import { getContacts, selectContactsState } from '../../state/contactsSlice';
import { disableScroll, enableScroll } from '../../utils';

const Contacts = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userId, isLogin } = useAppSelector(selectAuthState);
    const { list, status } = useAppSelector(selectContactsState);

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContact, setPopupContact] = useState<Contact | null>(null);
    const [filtredList, setFiltredList] = useState<Contact[] | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    const showPopup = (contact: Contact) => {
        disableScroll();
        setPopupContact(contact);
        setPopupVisible(true);        
    };

    const hidePopup = () => {
        setPopupVisible(false);
        setPopupContact(null);
        enableScroll();
    };

    const searchContact = (name: string): void => {
        name
            ? setFiltredList(list.filter(contact => RegExp(name, 'i').test(contact.name)))
            : setFiltredList(list)
    };

    useEffect(() => {
        !isLogin ? navigate('/login') : dispatch(getContacts(userId!));
    }, [isLogin]);

    useEffect(() => {

        setFiltredList(list);

        (status === 'pending') || (!filtredList)
            ? setIsFetching(true)
            : setIsFetching(false)
    }, [list, status]);

    return (
        <div className={styles.list_cont}>
            <Popup visible={popupVisible} onClose={hidePopup}>
                <ContactEditor contact={popupContact} onCancel={hidePopup} />
            </Popup>
            <Header onSearch={searchContact} />
            <ContactsList list={filtredList || []} onItemClick={showPopup} isFetching={isFetching} />
        </div>
    )
};

export default Contacts;