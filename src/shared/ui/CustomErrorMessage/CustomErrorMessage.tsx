import React, { memo } from 'react';
import Error from 'shared/assets/icons/error.svg';
import Icon from '../Icon/Icon';
import styles from './CustomErrorMessage.module.scss';
interface CustomErrorMessageProps {
  message: string;
}

const CustomErrorMessage: React.FC<CustomErrorMessageProps> = memo(({ message }) => {
  return (
    <div className={styles.wrapper}>
      <Icon icon={<Error />} />
      <div className={styles.error}>{message}</div>
    </div>
  );
});

export default CustomErrorMessage;
