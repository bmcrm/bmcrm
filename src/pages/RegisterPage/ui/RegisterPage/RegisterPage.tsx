import { memo } from 'react';
import { AuthForm } from 'shared/ui/AuthForm/AuthForm';
import Container from 'shared/ui/Container/Container';

import { signUpUser } from 'shared/api/cognito';

import { IInputsData } from './types';
import { RegisterForm } from '../RegisterForm/RegisterForm';

const RegisterPage = memo(() => {
  const handleSubmit = (values: IInputsData) => {
    const credentials = {
      ...values,
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
          <RegisterForm handleSubmit={handleSubmit} />
        </AuthForm>
      </Container>
    </section>
  );
});

export default RegisterPage;
