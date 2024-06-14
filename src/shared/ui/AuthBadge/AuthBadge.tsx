import { memo } from 'react';
import styles from './AuthBadge.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

type AuthBadgeProps = {
  className?: string;
  label?: string;
};

const AuthBadge = memo(({ className, label }: AuthBadgeProps) => {
  return (
    <div className={classNames(styles.badge, {}, [className])}>
      <h1 className={styles.badge__caption}>{label}</h1>
    </div>
  );
});

export default AuthBadge;
