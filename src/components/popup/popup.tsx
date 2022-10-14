import { MouseEventHandler } from 'react';
import cx from 'classNames';
import styles from './popup.module.css';

type Props = {
    children: React.ReactNode,
    visible: boolean,
    onClose: MouseEventHandler<HTMLDivElement>
}

const Popup: React.FC<Props> = ({ children, visible, onClose }) => {
    return (
        <div
            className={
                cx(styles.popup_cont, {
                    'popup_cont--visible': visible
                })
            }
            onClick={onClose}
        >
            {visible && children}
        </div>
    )
};

export default Popup;