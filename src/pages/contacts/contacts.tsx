import styles from './contacts.module.css';
import Popup from '../../components/popup/popup';
import ContactsList from '../../components/contacts-list/contacts-list';
import ContactEditor from '../../components/contact-editor/contact-editor';
import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { loginUser, selectAuthState } from '../../state/authSlice';
import { Contact } from '../../models/contact';
import { getContacts, selectContactsState } from '../../state/contactsSlice';
import { disableScroll, enableScroll } from '../../utils';
import { LoginData } from '../../models/api';
import Search from '../../components/search/search';
import Profile from '../../components/profile/profile';
import AddContact from '../../components/add-contact/add-contact';

const Contacts = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLogin,accessToken } = useAppSelector(selectAuthState);
    const { list, status } = useAppSelector(selectContactsState);

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContact, setPopupContact] = useState<Contact | null>(null);
    const [filtredList, setFiltredList] = useState<Contact[] | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    const showPopup = (contact?: Contact) => {
        
        disableScroll();
        setPopupContact(contact || null);
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
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');

        if (user && !isLogin) {

            setIsFetching(true);

            const data: LoginData = { grantAccess: { ...JSON.parse(user) } };

            dispatch(loginUser(data))
                .then((result) => {
                    if (loginUser.rejected.match(result)) {
                        navigate('/login');
                    }
                })
        }
        else if (!isLogin && !isFetching) {

            navigate('/login');
        }
    }, [isLogin]);

    useEffect(() => {        
        
        if (isLogin &&accessToken) {

            dispatch(getContacts(accessToken));
        }
    }, [isLogin, accessToken]);

    useEffect(() => {

        setFiltredList(list);

        (status === 'pending') || (!filtredList)
            ? setIsFetching(true)
            : setIsFetching(false)
    }, [list, status]);

    return (
        <div className={styles.list_cont}>
            <Popup visible={popupVisible}>
                <ContactEditor contact={popupContact} onCancel={hidePopup} />
            </Popup>
            <Header>
                <Profile />
                <AddContact onClick={showPopup} />
                <Search onSearch={searchContact} />
            </Header>
            <ContactsList list={filtredList || []} onItemClick={showPopup} isFetching={isFetching} />
        </div>
    )
};

export default Contacts;