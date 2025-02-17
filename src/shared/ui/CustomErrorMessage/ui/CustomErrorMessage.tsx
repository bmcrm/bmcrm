import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon } from '@shared/ui/Icon';
import styles from './CustomErrorMessage.module.scss';
import ErrorIcon from '@shared/assets/icons/error.svg';

interface CustomErrorMessageProps {
  className?: string;
  message?: string;
}

const CustomErrorMessage = memo(({ message, className }: CustomErrorMessageProps) => (
  <div className={classNames(styles.message, {}, [className])} aria-label={'Error message'}>
    <Icon icon={<ErrorIcon />} />
    {message &&  <p>{message}</p>}
  </div>
));

export default CustomErrorMessage;
