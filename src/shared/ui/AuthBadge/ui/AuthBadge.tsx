import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './AuthBadge.module.scss';

type AuthBadgeProps = {
  className?: string;
  label?: string;
};

const AuthBadge = memo(({ className, label }: AuthBadgeProps) => (
  <div className={classNames(styles.badge, {}, [className])}>
    <h1 className={styles.badge__caption}>{label}</h1>
  </div>
));

export default AuthBadge;
