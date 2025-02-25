import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './DashboardPage.module.scss';

type DashboardPageProps = {
  className?: string;
};

const DashboardPage = ({ className }: DashboardPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RoutePath.campers, { replace: true });
  }, [navigate]);

  return (
    <section className={classNames(styles.dashboard, {}, [className])}>
      <Container>
        <h1>Dashboard Page</h1>
      </Container>
    </section>
  );
};

export default DashboardPage;
