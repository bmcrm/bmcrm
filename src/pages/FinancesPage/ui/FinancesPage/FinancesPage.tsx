import { classNames } from '@shared/lib/classNames';
import styles from './FinancesPage.module.scss';

const FinancesPage = () => (
  <section className={classNames(styles.finances, {}, [])}>
    <h1>Finances Page</h1>
  </section>
);

export default FinancesPage;
