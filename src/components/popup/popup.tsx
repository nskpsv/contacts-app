import { MouseEventHandler, useEffect, useRef } from 'react';
import styles from './popup.module.css';
import classNames from 'classnames/bind';

type Props = {
  children: React.ReactNode;
  visible: boolean;
};

const Popup: React.FC<Props> = ({ children, visible }) => {
  const cx = classNames.bind(styles);

  return (
    <div
      className={cx({
        popup_container: true,
        'popup_container--visible': visible,
      })}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Popup;
