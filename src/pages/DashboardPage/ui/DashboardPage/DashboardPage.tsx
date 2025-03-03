import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { Calendar } from '@widgets/Calendar';
import styles from './DashboardPage.module.scss';

type DashboardPageProps = {
  className?: string;
};

const MOCK_DATA = {
  '2024-03-25': ['John Doe', 'Mickey Doe'],
  '2025-03-15': ['Jack Black', 'Jane Doe'],
  '2023-03-10': ['Nikki Minaj', 'Sara Poulson'],
  '1970-03-03': ['Old Man', 'Old Lady'],
  '1980-03-03': ['Not old Man'],
  '1980-04-04': ['Next months'],
};

const DashboardPage = ({ className }: DashboardPageProps) => {

  return (
    <section className={classNames(styles.dashboard, {}, [className])}>
      <Container>
        <Calendar birthdays={MOCK_DATA} />
      </Container>
    </section>
  );
};

export default DashboardPage;
