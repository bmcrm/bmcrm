import styles from './Steps.module.scss'
import clsx from 'clsx'

interface Props {
  selected: number
  setStep: (step: number) => void
}
export const Steps = ({ selected, setStep }: Props) => {
  return (
    <section className={styles.wrapper}>
      <button onClick={() => setStep(1)} className={clsx(selected === 1 && styles.active)} />
      <button onClick={() => setStep(2)} className={clsx(selected === 2 && styles.active)} />
    </section>
  )
}
