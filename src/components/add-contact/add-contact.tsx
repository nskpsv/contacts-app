import addIcon from './assets/add-contact.svg';
import styles from './add-contact.module.css';

type Props = {
    onClick: Function
}

const AddContact: React.FC<Props> = ({ onClick }) => {

    const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick();
    }

    return (
        <div className={styles.container} onClick={clickHandler}>
            <img className={styles.icon} src={addIcon} />
        </div>
    )
};

export default AddContact;