import { memo, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import errorHandler from 'shared/lib/errorHandler/errorHandler';
import { classNames } from 'shared/lib/classNames/classNames';

import Container from 'shared/ui/Container/Container';
import { CampOverview, useCamp } from 'entities/Camp';
import { CamperSignUpForm, type IUserRegisterData, useAuth } from 'entities/User';
import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';
import FormLoader from 'features/FormLoader';

import styles from './CampOverviewPage.module.scss';
import { RoutePath } from 'app/providers/AppRouter';
import Logo from 'shared/assets/icons/logo.svg';
import CampNotFound from 'widgets/CampNotFound';

const CampOverviewPage = memo(() => {
  const { register, error, resetError, isLoading: authIsLoading } = useAuth();
  const { isLoading, isError } = useCamp();
  const { id }  = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const submitHandler = async (values: IUserRegisterData, { resetForm }: { resetForm: () => void }) => {
    const data = { ...values, camp_id: id };
    const response = await register(data);

    if (response) {
      toast.success(
        'Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.',
        { duration: 5000, position: 'top-center' }
      );
      resetForm();
      navigate(RoutePath.sign_in, { replace: true });
    }
  };

  return (
    <>
      <header className={styles.header}>
        <Container>
          <strong className={styles.logo}>
            <Link to={RoutePath.funnel} className={styles.logo__link}>
              <Logo/>
            </Link>
          </strong>
        </Container>
      </header>
      <main className={classNames(styles.page, { [styles.error]: !!isError }, [])}>
        {isError && <CampNotFound/>}
        {!isError && (
          <section className={classNames(styles.overview, {}, [])}>
            <Container>
              <CampOverview campID={id}/>
            </Container>
          </section>
        )}
        {!isLoading && !isError && (
          <section className={styles.register}>
            <Container>
              <div className={styles.register__inner}>
                {authIsLoading && <FormLoader/>}
                <AuthBadge label={'Register to Join the Camp'}/>
                <CamperSignUpForm className={styles.form} onSubmit={submitHandler}/>
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
});

export default CampOverviewPage;