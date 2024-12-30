import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import styles from './DashboardPage.module.scss';

type DashboardPageProps = {
  className?: string;
};

const DashboardPage = ({ className }: DashboardPageProps) => (
  <section className={classNames(styles.dashboard, {}, [className])}>
    <Container>
      <h1>Dashboard Page</h1>
    </Container>
  </section>
);

export default DashboardPage;
