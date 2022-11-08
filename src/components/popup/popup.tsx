import { MouseEventHandler, useEffect, useRef } from 'react';
import styles from './popup.module.css';

type Props = {
    children: React.ReactNode,
    visible: boolean,
    onClose: MouseEventHandler<HTMLDivElement>
}

const Popup: React.FC<Props> = ({ children, visible, onClose }) => {

    const popup = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (popup.current) {
            visible
                ? popup.current.classList.add(styles['popup_cont--visible'])
                : popup.current.classList.remove(styles['popup_cont--visible'])
        }
    }, [visible])

    return (
        <div className={styles.popup_container} onClick={onClose} ref={popup}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};

export default Popup;