import styles from './Steps.module.scss'
import clsx from 'clsx'

interface Props {
  selected: number
}
export const Steps = ({ selected }: Props) => {
  return (
    <section className={styles.wrapper}>
      <div className={clsx(styles.active)} />
      <div className={clsx(selected === 2 && styles.active)} />
    </section>
  )
}
