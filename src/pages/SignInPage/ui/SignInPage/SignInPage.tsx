import { classNames } from 'shared/lib/classNames/classNames';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';

import styles from './SignInPage.module.scss';

type SignInPageProps = {
  className?: string;
};

const SignInPage = ({ className }: SignInPageProps) => {
  return (
    <AuthPageTemplate className={classNames('', {}, [className])}>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <div className={styles.signIn}></div>
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
};

export default SignInPage;
