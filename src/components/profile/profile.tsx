import { useState } from 'react';
import { logOut, selectUserName, selectUserPhoto } from '../../state/authSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import classNames from 'classnames/bind';
import styles from './profile.module.css';

const Profile = () => {

    const userName = useAppSelector(selectUserName);
    const userPhoto = useAppSelector(selectUserPhoto);
    const dispatch = useAppDispatch();
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const cx = classNames.bind(styles);
    const toggleOptionsVisible: React.MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation();
        setShowOptions(prev => !prev);
    }

    return (
        <div className={styles.user_profile} onClick={toggleOptionsVisible}>
            <img className={styles.user_profile__photo} src={userPhoto} />
            <p className={styles.user_profile__name}>
                {userName}
            </p>
            <ul className={cx({ options: true, 'options--visible': showOptions })} onMouseLeave={toggleOptionsVisible}>
                <li className={styles.options__item} onClick={() => dispatch(logOut())}>Выйти</li>
            </ul>
        </div>
    )
};

export default Profile;