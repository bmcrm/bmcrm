import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './FinancesPage.module.scss';

const FinancesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RoutePath.campers, { replace: true });
  }, [navigate]);

  return (
    <section className={classNames(styles.finances, {}, [])}>
      <h1>Finances Page</h1>
    </section>
  );
};

export default FinancesPage;
