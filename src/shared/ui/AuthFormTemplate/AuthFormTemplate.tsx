import { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';
import styles from './AuthFormTemplate.module.scss';
import Logo from 'icons/logo.svg';

interface AuthFormProps {
  className?: string;
  children?: ReactNode;
  badge?: string;
  background?: boolean;
}

const AuthFormTemplate = (props: AuthFormProps) => {
  const {
    className,
    children,
    badge,
    background,
  } = props;

  return (
    <div className={classNames(styles.wrapper, { [styles.bg]: background }, [className])}>
      <span className={styles.wrapper__logo}><Logo/></span>
      <div className={styles.wrapper__inner}>
        {badge && <AuthBadge label={badge}/>}
        {children}
      </div>
    </div>
  );
};

export default AuthFormTemplate;
