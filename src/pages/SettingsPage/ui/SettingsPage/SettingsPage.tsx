import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Outlet } from 'react-router-dom';
import { Container } from '@shared/ui/Container';
import { SettingsNav } from '@features/SettingsNav';
import styles from './SettingsPage.module.scss';

type SettingsPageProps = {
  className?: string;
};

const SettingsPage = memo(({ className }: SettingsPageProps) => (
  <section className={classNames(styles.settings, {}, [className])}>
    <Container className={styles.container}>
      <SettingsNav/>
      <Outlet/>
    </Container>
  </section>
));

export default SettingsPage;
