import { CustomInput } from 'shared/ui/CustomInput/CustomInput'
import Button from 'shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import Camp from 'shared/assets/icons/camp.svg'
import { ButtonSize } from 'shared/ui/Button/ButtonTypes'
import { stepOneCreateCamp } from './stepOneData'
import { Field, Form, Formik } from 'formik'
import styles from '../RegisterPage/RegisterPage.module.scss'
import { IStepOneData } from './Step.types'

interface StepOneProps {
  onSubmit: (values: IStepOneData) => void
  initialValues: IStepOneData
}

export const StepOne = ({ onSubmit, initialValues }: StepOneProps) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      <Form className={styles.form}>
        {stepOneCreateCamp.map(input => (
          <CustomInput key={input.name} {...input} />
        ))}
        <label className={styles.acceptLabel}>
          <Field className={styles.checkbox} type='checkbox' name='accept' />
          <span className={styles.checkmark} />
          <p>I agree to the privacy policy</p>
        </label>
        <Button
          size={ButtonSize.M}
          type='submit'
          style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}
        >
          <Camp />
          NEXT
        </Button>
        <p className='linkWrapper'>
          Already have an account?
          <Link className='link' to='/login'>
            Sign in
          </Link>
        </p>
      </Form>
    </Formik>
  )
}
