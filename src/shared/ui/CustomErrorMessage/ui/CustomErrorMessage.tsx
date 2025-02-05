import { memo } from 'react';
import { Icon } from '@shared/ui/Icon';
import styles from './CustomErrorMessage.module.scss';
import ErrorIcon from '@shared/assets/icons/error.svg';

interface CustomErrorMessageProps {
  message: string;
}

const CustomErrorMessage = memo(({ message }: CustomErrorMessageProps) => (
  <div className={styles.message}>
    <Icon icon={<ErrorIcon />} />
    <p>{message}</p>
  </div>
));

export default CustomErrorMessage;
