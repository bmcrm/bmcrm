import styles from './DashboardPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Container from 'shared/ui/Container/Container';

type DashboardPageProps = {
  className?: string;
};

const DashboardPage = ({ className }: DashboardPageProps) => {
  return (
    <section className={classNames(styles.dashboard, {}, [className])}>
      <Container>
        <h1>Dashboard Page</h1>
      </Container>
    </section>
  );
};

export default DashboardPage;
