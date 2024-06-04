import { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';
import styles from './AuthFormTemplate.module.scss';

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
      {badge && <AuthBadge label={badge}/>}
      {children}
    </div>
  );
};

export default AuthFormTemplate;
