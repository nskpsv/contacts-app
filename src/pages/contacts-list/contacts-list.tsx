import styles from './contacts-list.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { selectAuthState } from '../../state/authSlice';
import { Contact } from '../../models/contact';
import { getContacts, selectContactsState } from '../../state/contactsSlice';
import ContactsListItem from '../../components/contacts-list-item/contacts-list-item';


const ContactsList = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {userName, userId, isLogin} = useAppSelector(selectAuthState);
    const {error, list, status} = useAppSelector(selectContactsState);
 
    useEffect(() => {
        !isLogin ? navigate('/login') : dispatch(getContacts(userId!));
    }, [isLogin])

    return (
        <div className={styles.list_cont}>
        <h1>{`Здравствуйте ${userName}`}</h1>
        {
        list.length 
        ? list.map((contact, id) => <ContactsListItem key={id} contact={contact} />) 
        : <p className={styles.error}>У вас пока нет контактов.</p> 
        }
        </div>
    )
};

export default ContactsList;