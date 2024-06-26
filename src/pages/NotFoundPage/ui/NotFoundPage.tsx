import styles from './NotFoundPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Container from 'shared/ui/Container/Container';

type NotFoundPageProps = {
  className?: string;
};

const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
  return (
    <section className={classNames(styles.notFound, {}, [className])}>
      <Container>
        <h1>Page not found!</h1>
      </Container>
    </section>
  );
});

export default NotFoundPage;
