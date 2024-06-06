import { memo } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Camp from 'shared/assets/icons/camp.svg';

import { INPUTS_STATE, inputsDataCamp, inputsDataUser } from './inputsData';
import styles from './OwnerSignUpForm.module.scss';
import { registrationSchema } from 'shared/lib/schemas/schemas';
import { ButtonSize } from 'shared/ui/Button/Button.types';
import { IInputsData } from './OwnerSignUpForm.types';
import { RoutePath } from 'app/providers/AppRouter';
import CustomErrorMessage from 'shared/ui/CustomErrorMessage/CustomErrorMessage';

interface Props {
  handleSubmit: (values: IInputsData, { resetForm }: { resetForm: () => void }) => void;
}
const OwnerSignUpForm = memo(({ handleSubmit }: Props) => {
  return (
    <Formik validationSchema={registrationSchema} onSubmit={handleSubmit} initialValues={INPUTS_STATE}>
      <Form className={styles.form}>
        <section>
          {inputsDataCamp.map(input => (
            <CustomInput key={input.name} {...input} />
          ))}
        </section>
        <section>
          <div className={styles.flex}>
            <CustomInput name='firstName' placeholder='Cole' label='First Name' />
            <CustomInput name='lastName' placeholder='Sprouse' label='Last Name' />
          </div>
          {inputsDataUser.map(input => (
            <CustomInput key={input.name} {...input} />
          ))}
          <label className={styles.acceptLabel}>
            <Field className={styles.checkbox} type='checkbox' name='accept' />
            <ErrorMessage className={styles.error} name='accept' render={msg => <CustomErrorMessage message={msg} />} />

            <span className={styles.checkmark} />
            <p>I agree to the privacy policy</p>
          </label>
          <Button size={ButtonSize.M} type='submit' fluid>
            <Camp />
            SIGN UP
          </Button>
          <p className='redirect-link redirect-link--ruby'>
            Already have an account?{' '}
            <Link className='link' to={RoutePath.sign_in}>
              Sign in
            </Link>
          </p>
        </section>
      </Form>
    </Formik>
  );
});

export default OwnerSignUpForm;
