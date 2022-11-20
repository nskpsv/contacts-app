import styles from './field.module.css';
import classNames from 'classnames/bind';

type Props = {
  error?: string;
  label?: string;
  children: React.ReactNode;
  labelFor?: string;
};

export const Field: React.FC<Props> = ({
  error,
  children,
  label,
  labelFor,
}) => {
  const cx = classNames.bind(styles);

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.field__label} htmlFor={labelFor}>
          {label}
        </label>
      )}
      {children}
      <div className={cx('field__error', { 'field__error--visible': error })}>
        <span className={styles.field__error_message}>{error}</span>
      </div>
    </div>
  );
};
