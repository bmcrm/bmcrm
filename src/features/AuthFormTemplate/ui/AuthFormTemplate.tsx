import { ReactNode } from 'react';
import { classNames, type Mods } from 'shared/lib/classNames/classNames';
import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';
import styles from './AuthFormTemplate.module.scss';
import Logo from 'icons/logo.svg';

interface AuthFormProps {
  className?: string;
  children?: ReactNode;
  badge?: string;
  background?: boolean;
  logo?: boolean;
  decor?: boolean;
}

const AuthFormTemplate = (props: AuthFormProps) => {
  const {
    className,
    children,
    badge,
    background,
    logo = false,
    decor = false,
  } = props;
  const mods: Mods = {
    [styles.bg]: background,
    [styles.decor]: decor,
  };

  return (
    <div className={classNames(styles.wrapper, mods, [className])}>
      {logo && <span className={styles.wrapper__logo}><Logo/></span>}
      <div className={styles.wrapper__inner}>
        {badge && <AuthBadge label={badge}/>}
        {children}
      </div>
    </div>
  );
};

export default AuthFormTemplate;
