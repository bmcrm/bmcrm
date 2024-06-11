import styles from './ShiftsPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

const ShiftsPage = memo(() => {
  return (
    <section className={classNames(styles.shifts, {}, [])}>
      <h1>Shifts Page</h1>
    </section>
  );
});

export default ShiftsPage;
