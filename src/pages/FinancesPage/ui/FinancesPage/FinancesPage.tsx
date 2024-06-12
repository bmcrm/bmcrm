import styles from './FinancesPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

const FinancesPage = memo(() => {
  return (
    <section className={classNames(styles.finances, {}, [])}>
      <h1>Finances Page</h1>
    </section>
  );
});

export default FinancesPage;
