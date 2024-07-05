import { memo, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import errorHandler from 'shared/lib/errorHandler/errorHandler';
import { classNames } from 'shared/lib/classNames/classNames';

import Container from 'shared/ui/Container/Container';
import { CampOverview, type ICamp, useCamp } from 'entities/Camp';
import { CamperSignUpForm, type IUserRegisterData, useAuth } from 'entities/User';
import FormLoader from 'features/FormLoader';
import AuthFormTemplate from 'features/AuthFormTemplate';
import AlreadyRegisteredBlock from 'features/AlreadyRegisteredBlock';

import styles from './CampOverviewPage.module.scss';
import { RoutePath } from 'app/providers/AppRouter';
import Logo from 'shared/assets/icons/logo.svg';
import NotFound from 'widgets/CampNotFound';

const CampOverviewPage = memo(() => {
  const { register, error, resetError, isLoading: authIsLoading, isLoggedIn } = useAuth();
  const { isLoading, isError, getCamp } = useCamp();
  const [camp, setCamp] = useState<ICamp>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scrollTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  useEffect(() => {
    const fetchCamp = async () => {
      const response = await getCamp(id as string);

      if (response) {
        setCamp({ ...response });
      }
    };

    void fetchCamp();
  }, [getCamp, id]);

  const submitHandler = async (values: IUserRegisterData, resetForm: () => void) => {
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
              <Logo />
            </Link>
          </strong>
        </Container>
      </header>
      <main className={classNames(styles.page, { [styles.error]: !!isError }, [])}>
        {isError && (
          <NotFound textRedirect='CREATE A CAMP AND ACCOUNT' redirectTo={RoutePath.sign_up}>
            <h1>Such a camp doesn't exist!</h1>
            <p>Want to create it? Click the button below!</p>
          </NotFound>
        )}
        {!isError && (
          <section className={classNames(styles.overview, {}, [])}>
            <Container>
              <CampOverview camp={camp || null} isLoading={isLoading} scrollTarget={scrollTarget} />
            </Container>
          </section>
        )}
        {!isLoading && !isError && (
          <section className={styles.register} ref={scrollTarget}>
            <Container>
              {isLoggedIn ? (
                <AlreadyRegisteredBlock camp={camp || null} />
              ) : (
                <AuthFormTemplate badge={'Register to Join the Camp'}>
                  <CamperSignUpForm className={styles.form} onSubmit={submitHandler} />
                  {authIsLoading && <FormLoader />}
                </AuthFormTemplate>
              )}
            </Container>
          </section>
        )}
      </main>
    </>
  );
});

export default CampOverviewPage;
