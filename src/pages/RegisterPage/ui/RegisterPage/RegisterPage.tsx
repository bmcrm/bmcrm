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

  const [formData, setFormData] = useState({
    campName: '',
    campId: '',
    city: '',
    website: '',
    accept: false,
    firstName: '',
    lastName: '',
    playaName: '',
    email: '',
    password: '',
  })
  const nextStep = () => setSelected(step => step + 1)
  const handleSubmit = (values: IStepOneData | IStepTwoData) => {
    setFormData({ ...formData, ...values })
    if (selected !== 1) {
      return console.log(values)
    }
    nextStep()
  }
  return (
    <section>
      <Container>
        <AuthForm>
          {selected === 1 ? (
            <StepOne initialValues={formData} onSubmit={handleSubmit} nextStep={nextStep} />
          ) : (
            <StepTwo initialValues={formData} onSubmit={handleSubmit} nextStep={nextStep} />
          )}
        </AuthForm>
        <Steps setStep={setSelected} selected={selected} />
      </Container>
    </section>
  )
})

export default RegisterPage
