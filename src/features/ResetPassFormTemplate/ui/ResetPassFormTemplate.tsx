import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';

import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';

import styles from './ResetPassFormTemplate.module.scss';
import { RoutePath } from 'app/providers/AppRouter';
import { ResetFormBg } from 'features/ResetPassFormTemplate/model/types/resetPassFormTemplate.types.ts';

interface ResetPassFormTemplateProps {
  className?: string;
  children?: ReactNode;
  badge?: string;
  desc?: string | null;
  background?: ResetFormBg;
}

const ResetPassFormTemplate = (props: ResetPassFormTemplateProps) => {
  const {
    className,
    children,
    badge,
    desc,
    background = ResetFormBg.KEY,
  } = props;

  return (
    <div className={classNames(styles.wrapper, {}, [className, styles[background]])}>
      {badge && <AuthBadge label={badge}/>}
      <div className={styles.wrapper__inner}>
        {desc && <p className={styles.desc}>{desc}</p>}
        {children}
        <Link to={RoutePath.sign_in} className={styles.link}>Back to Sign In</Link>
      </div>
    </div>
  );
};

export default ResetPassFormTemplate;
