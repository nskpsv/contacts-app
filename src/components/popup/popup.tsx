import { MouseEventHandler, useEffect, useRef } from 'react';
import styles from './popup.module.css';

type Props = {
    children: React.ReactNode,
    visible: boolean,
    onClose: Function
}

const Popup: React.FC<Props> = ({ children, visible, onClose }) => {

    const popup = useRef<HTMLDivElement>(null);
    const close: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        onClose();
    };

    useEffect(() => {
        if (popup.current) {
            visible
                ? popup.current.classList.add(styles['popup_cont--visible'])
                : popup.current.classList.remove(styles['popup_cont--visible'])
        }
    }, [visible])

    return (
        <div className={styles.popup_cont} onClick={close} ref={popup}>
            {children}
        </div>
    )
};

export default Popup;