import { classNames } from '@shared/lib/classNames';
import styles from './ShiftsPage.module.scss';

const ShiftsPage = () => (
  <section className={classNames(styles.shifts, {}, [])}>
    <h1>Shifts Page</h1>
  </section>
);

export default ShiftsPage;
