import styles from './InventoryPage.module.scss'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import Sidebar from 'widgets/Sidebar'

const InventoryPage = memo(() => {
  return (
    <>
      <Sidebar title={'Inventory Page Sidebar'} />
      <section className={classNames(styles.inventory, {}, [])}>
        <h1>Inventory Page</h1>
      </section>
    </>
  )
})

export default InventoryPage
