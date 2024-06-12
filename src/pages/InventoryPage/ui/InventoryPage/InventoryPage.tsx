import styles from './InventoryPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

const InventoryPage = memo(() => {
  return (
    <section className={classNames(styles.inventory, {}, [])}>
      <h1>Inventory Page</h1>
    </section>
  );
});

export default InventoryPage;
