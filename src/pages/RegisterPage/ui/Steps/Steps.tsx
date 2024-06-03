import styles from './Steps.module.scss'

interface Props {
  nextStep: (step: number) => void
  selected: number
}
export const Steps = ({ nextStep, selected }: Props) => {
  return (
    <section className={styles.wrapper}>
      <button className={selected === 1 ? styles.active : ''} onClick={() => nextStep(1)}></button>
      <button className={selected === 2 ? styles.active : ''} onClick={() => nextStep(2)}></button>
    </section>
  )
}
