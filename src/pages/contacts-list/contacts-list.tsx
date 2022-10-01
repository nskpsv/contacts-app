import styles from './contacts-list.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ContactsList = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (true) {
            navigate('login');
        }
    })

    return (
        <h1>Contacts List</h1>
    )
};

export default ContactsList;