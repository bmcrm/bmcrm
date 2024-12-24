import { memo, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { CampOverview, type ICamp } from '@entities/Camp';
import { CamperRegisterForm, type IUserRegisterData } from '@entities/User';
import { FormLoader } from '@features/FormLoader';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { AlreadyRegisteredBlock } from '@features/AlreadyRegisteredBlock';
import { RoutePath } from '@app/providers/AppRouter';
import { NotFound } from '@widgets/CampNotFound';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import styles from './CampOverviewPage.module.scss';
import Logo from '@shared/assets/icons/logo.svg';
import { useToast } from '@shared/hooks/useToast';

const CampOverviewPage = memo(() => {
  const { register, error, resetError, isLoading: authIsLoading, isLoggedIn } = useAuth();
  const { isLoading, isError, getCamp } = useCamp();
  const [camp, setCamp] = useState<ICamp>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scrollTarget = useRef<HTMLDivElement>(null);
  const { success } = useToast();

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
    const { password, email, ...logData } = data;

    try {
      await register(data);
      logger(LogLevel.INFO, LogSource.WEBAPP, 'New user registered as camper', {
        user: values.email,
        camp_id: id,
      });

      success('Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.');
      resetForm();
      navigate(RoutePath.sign_in, { replace: true, state: { email: values.email, password: values.password } });
    } catch {
      logger(LogLevel.ERROR, LogSource.WEBAPP, 'Error during registration', {
        user: values.email,
        ...logData,
      });
      return null;
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
              <AuthFormTemplate badge={'Register to Join the Camp'}>
                <CamperRegisterForm className={clsx(styles.form, isLoggedIn && styles.blur)} onSubmit={submitHandler} />
                {authIsLoading && <FormLoader />}
                {isLoggedIn && <AlreadyRegisteredBlock camp={camp || null} />}
              </AuthFormTemplate>
            </Container>
          </section>
        )}
      </main>
    </>
  );
});

export default CampOverviewPage;
