import { InputHTMLAttributes } from 'react';
import styles from './input.module.css';
import classNames from 'classnames/bind';

export const Input: React.FC<{ isError?: boolean } & InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const { isError, ...otherProps } = props;
    const cx = classNames.bind(styles);

    return (
        <input
            className={cx({ input: true, 'input--error': isError })}
            {...otherProps} 
        />
    )
};