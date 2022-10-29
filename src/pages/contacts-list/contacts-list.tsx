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
import Header from '../../components/header/header';


const ContactsList = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userName, userId, isLogin } = useAppSelector(selectAuthState);
    const { error, list, status } = useAppSelector(selectContactsState);
 
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContact, setPopupContact] = useState<Contact | null>(null);
    const [filtredList, setFiltredList] = useState(list);

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

    const search = (name: string): void => {       
        
        name
        ? setFiltredList(list.filter(contact => RegExp(name, 'i').test(contact.name)))
        : setFiltredList(list)
    }

    useEffect(() => {

        !isLogin ? navigate('/login') : dispatch(getContacts(userId!));
    }, [isLogin]);
    
    useEffect(() => {

        setFiltredList(list);
    }, [list]);
    
    return (
        <div className={styles.list_cont}>
            <Popup visible={popupVisible} onClose={hidePopup}>
                <ContactEditor contact={popupContact} onSubmit={() => { }} />
            </Popup>
            <Header onSearch={search}/>
            <div className={styles.list}>
                {
                    filtredList.length
                        ? filtredList.map((contact, id) => <ContactsListItem key={id} contact={contact} onClick={() => showPopup(contact)} />)
                        : <p className={styles.error}>У вас пока нет контактов.</p>
                }
            </div>
        </div>
    )
};

export default ContactsList;