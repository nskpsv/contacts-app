import { selectUserName, selectUserPhoto } from '../../state/authSlice';
import { useAppSelector } from '../../state/hooks';
import styles from './header.module.css';
import searchIcon from './assets/magnifier.png';
import clearIcon from './assets/clear.png';
import { FC, useRef, useState } from 'react';

type Props = {
    onSearch: Function 
}

const Header: FC<Props> = ({ onSearch }) => {

    const userName = useAppSelector(selectUserName);
    const userPhoto = useAppSelector(selectUserPhoto);
    const [searchValue, setSearchValue] = useState('');
    const input = useRef<HTMLInputElement>(null);

    const cleanHandler = () => {

        setSearchValue('');
        onSearch('');
        input.current!.focus();
    };

    const onSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchValue(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <>
            <div className={styles.header__pad}></div>
            <header className={styles.header}>
                <div className={styles.header__cont}>
                    <div className={styles.user_profile}>
                        <img className={styles.user_profile__photo} src={userPhoto} />
                        <p className={styles.user_profile__name}>
                            {userName}
                        </p>
                    </div>
                    <div className={styles.search}>
                        <div className={styles.search__icon} >
                            <div className={styles.search__left_icon}>
                                <img className={styles.search__icon_image} src={searchIcon} />
                            </div>
                        </div>
                        <input className={styles.search__input} ref={input} value={searchValue} onChange={onSearchInput} />
                        <div className={styles.search__icon} >
                            <div className={`${styles.search__right_icon} ${searchValue ? null : styles['search__right_icon--hidden']}`} onClick={cleanHandler}>
                                <img className={styles.search__icon_image} src={clearIcon} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
};

export default Header;