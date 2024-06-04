import styles from './ProfilePage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Container from 'shared/ui/Container/Container';

type ProfilePageProps = {
  className?: string;
};

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  return (
    <section className={classNames(styles.profile, {}, [className])}>
      <Container>
        <h1>Settings Page</h1>
      </Container>
    </section>
  );
});

export default ProfilePage;
