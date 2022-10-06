import styles from './contacts-list.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import { selectAuthState, selectIsLogin, selectUserName } from '../../state/authSlice';
import { Contact } from '../../models/contact';


const ContactsList = () => {

    const navigate = useNavigate();
    const {userName, userId, isLogin} = useAppSelector(selectAuthState)
 
    useEffect(() => {
        if (!isLogin) {
            navigate('/login');
        }

        
    }, [isLogin])

    return (
        <div className={styles.list_cont}>
        <h1>{`Здравствуйте ${userName}`}</h1>
        </div>
    )
};

export default ContactsList;