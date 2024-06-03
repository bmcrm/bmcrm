import styles from './ShiftsPage.module.scss'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import Sidebar from 'widgets/Sidebar'

const ShiftsPage = memo(() => {
  return (
    <>
      <Sidebar title={'Shifts Page Sidebar'} />
      <section className={classNames(styles.shifts, {}, [])}>
        <h1>Shifts Page</h1>
      </section>
    </>
  )
})

export default ShiftsPage
