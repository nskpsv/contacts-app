import styles from './header.module.css';

type Props = {
    children: React.ReactNode
};

const Header: React.FC<Props> = ({ children }) => {

    return (
        <>
            <div className={styles.header__pad}></div>
            <header className={styles.header}>
                <div className={styles.header__cont}>
                    {children}
                </div>
            </header>
        </>
    )
};

export default Header;