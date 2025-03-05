import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { DashboardContent } from '../DashboardContent/DashboardContent';
import styles from './DashboardPage.module.scss';

type DashboardPageProps = {
  className?: string;
};

const DashboardPage = ({ className }: DashboardPageProps) => (
  <section className={classNames(styles.dashboard, {}, [className])}>
    <Container>
      <DashboardContent />
    </Container>
  </section>
);

export default DashboardPage;
