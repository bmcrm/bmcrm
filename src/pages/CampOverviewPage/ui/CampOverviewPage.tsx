import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Container from 'shared/ui/Container/Container';
import Image from 'shared/ui/Image/Image';
import Icon from 'shared/ui/Icon/Icon';
import { CamperSignUpForm } from 'entities/User';
import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';

import styles from './CampOverviewPage.module.scss';
import { RoutePath } from 'app/providers/AppRouter';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import Logo from 'shared/assets/icons/logo.svg';
import LocationIcon from 'shared/assets/icons/location_icon.svg';
import RedirectIcon from 'shared/assets/icons/arrow-redirect.svg';

const CampOverviewPage = memo(() => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });

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
        <section className={styles.overview}>
          <Container>
            <h1 className={styles.title}>camp overview</h1>
            <h2 className={styles.subtitle}>Campers 21</h2>
            <div className={styles.overview__row}>
              <Image borderRadius={isMobile ? 20 : 30}/>
              <div className={styles.overview__desc}>
                <p className={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <address className={styles.overview__address}>
                  <Icon icon={<LocationIcon/>} size={isTablet ? IconSize.SIZE_18 : IconSize.SIZE_24}/>
                  Miami Shores, FL, 33127
                </address>
                <Link to={'https://www.google.com.ua/'} className={styles.overview__btn}>
                  Camp website
                  <Icon icon={<RedirectIcon/>} size={isTablet ? IconSize.SIZE_20 : IconSize.SIZE_28}/>
                </Link>
              </div>
            </div>
          </Container>
        </section>
        <section className={styles.register}>
          <Container>
            <div className={styles.register__inner}>
              <AuthBadge label={'Register to Join the Camp'}/>
              <CamperSignUpForm className={styles.form}/>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
});

export default CampOverviewPage;
