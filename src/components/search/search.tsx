import searchIcon from './assets/magnifier.png';
import clearIcon from './assets/clear.png';
import styles from './search.module.css';
import { useRef, useState } from 'react';

type Props = {
    onSearch: Function
};

const Search: React.FC<Props> = ({ onSearch }) => {

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
    };

    return (
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
    )
};

export default Search;