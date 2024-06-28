import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Outlet } from 'react-router-dom';
import Container from 'shared/ui/Container/Container';
import SettingsNav from 'features/SettingsNav/ui/SettingsNav';
import styles from './SettingsPage.module.scss';

type SettingsPageProps = {
  className?: string;
};

const SettingsPage = memo(({ className }: SettingsPageProps) => {
  return (
    <section className={classNames(styles.settings, {}, [className])}>
      <Container className={styles.container}>
        <SettingsNav/>
        <Outlet/>
      </Container>
    </section>
  );
});

export default SettingsPage;
