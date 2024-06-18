import { memo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import errorHandler from 'shared/lib/errorHandler/errorHandler';
import { classNames } from 'shared/lib/classNames/classNames';

import Container from 'shared/ui/Container/Container';
import { CampOverview, useCamp } from 'entities/Camp';
import { CamperSignUpForm, type ICamperRegisterData, useAuth } from 'entities/User';
import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';

import styles from './CampOverviewPage.module.scss';
import { RoutePath } from 'app/providers/AppRouter';
import Logo from 'shared/assets/icons/logo.svg';

const CampOverviewPage = memo(() => {
  const { registerCamper, error, resetError } = useAuth();
  const { isLoading, isError } = useCamp();
  const { id }  = useParams<{ id: string }>();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const submitHandler = async (values: ICamperRegisterData, { resetForm }: { resetForm: () => void }) => {
    const response = await registerCamper(values);

    if (response) {
      resetForm();
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
      <main className={styles.page}>
        <section className={classNames(styles.overview, { [styles.centred]: !!isError }, [])}>
          <Container>
            <CampOverview campID={id}/>
          </Container>
        </section>
        {!isLoading && !isError && (
          <section className={styles.register}>
            <Container>
              <div className={styles.register__inner}>
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