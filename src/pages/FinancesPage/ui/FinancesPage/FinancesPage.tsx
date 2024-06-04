import styles from './FinancesPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Sidebar from 'widgets/Sidebar';

const FinancesPage = memo(() => {
  return (
    <>
      <Sidebar title={'Finances Page Sidebar'} />
      <section className={classNames(styles.finances, {}, [])}>
        <h1>Finances Page</h1>
      </section>
    </>
  );
});

export default FinancesPage;
