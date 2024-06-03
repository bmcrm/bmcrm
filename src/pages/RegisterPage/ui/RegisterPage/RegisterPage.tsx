import { memo, useState } from 'react'
import { AuthForm } from 'shared/ui/AuthForm/AuthForm'
import Container from 'shared/ui/Container/Container'
import { IStepTwoData } from './Step.types'
import { IStepOneData } from '../StepOne/Step.types'
import { Steps } from '../Steps/Steps'
import { StepOne } from '../StepOne/StepOne'
import { StepTwo } from '../StepTwo/StepTwo'

const RegisterPage = memo(() => {
  const [selected, setSelected] = useState(1)

  const stepOneValues: IStepOneData = { campName: '', campId: '', city: '', website: '', accept: false }
  const stepTwoValues: IStepTwoData = {
    firstName: '',
    lastName: '',
    accept: false,
    playaName: '',
    email: '',
    password: '',
  }
  const handleSubmit = (values: IStepOneData | IStepTwoData) => {
    console.log(values)
  }
  const nextStep = () => setSelected(selected === 1 ? 2 : 1)
  return (
    <section>
      <Container>
        <AuthForm>
          {selected === 1 ? (
            <StepOne initialValues={stepOneValues} onSubmit={handleSubmit} nextStep={nextStep} />
          ) : (
            <StepTwo initialValues={stepTwoValues} onSubmit={handleSubmit} nextStep={nextStep} />
          )}
        </AuthForm>
        {/* {selected === 'one' ? (
          <StepOne initialValues={stepOneValues} onSubmit={handleSubmit} />
        ) : (
          <AuthForm onSubmit={handleSubmit} initialValues={stepTwoValues} selected={selected} />
        )} */}

        <Steps nextStep={nextStep} selected={selected} />
      </Container>
    </section>
  )
})

export default RegisterPage
