import { memo, useState } from 'react';

import { AuthForm } from 'shared/ui/AuthForm/AuthForm';
import Container from 'shared/ui/Container/Container';

import { IStepOneData, IStepTwoData } from '../StepOne/Step.types';
import { Steps } from '../Steps/Steps';
import { StepOne } from '../StepOne/StepOne';
import { StepTwo } from '../StepTwo/StepTwo';
import { signUpUser } from 'shared/api/cognito';

const RegisterPage = memo(() => {
  const [selected, setSelected] = useState(1);

  const [formData, setFormData] = useState({
    campName: 'Maiami Playa',
    campId: 'MP',
    city: 'Miami',
    website: 'www.test.ua',
    accept: false,
    firstName: 'John',
    lastName: 'Wick',
    playaName: '@mail.com',
    email: 'john@mail.com',
    password: '123Qwe!a',
  });
  const nextStep = () => setSelected(step => step + 1);
  const handleSubmit = (values: IStepOneData | IStepTwoData) => {
    setFormData(prev => ({ ...prev, ...values }));
    if (selected === 1) {
      nextStep();
    } else {
      handleFormSubmit();
    }
  };

  const handleFormSubmit = () => {
    const { accept, ...data } = formData;
    const credentials = {
      ...data,
      username: data.firstName + data.lastName,
    };

    signUpUser(credentials)
      .then(response => {
        console.log('Sign-up successful:', response);
      })
      .catch(error => {
        console.error('Sign-up failed:', error);
      });
  };
  return (
    <section>
      <Container>
        <AuthForm>
          {selected === 1 ? (
            <StepOne initialValues={formData} onSubmit={handleSubmit} />
          ) : (
            <StepTwo initialValues={formData} onSubmit={handleSubmit} />
          )}
        </AuthForm>
        <Steps setStep={setSelected} selected={selected} />
      </Container>
    </section>
  );
});

export default RegisterPage;
