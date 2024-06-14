import { memo } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Camp from 'shared/assets/icons/camp.svg';

import { INPUTS_STATE, inputsDataUser } from './inputsData';
import styles from './OwnerSignUpForm.module.scss';
import { registrationSchema } from 'shared/const/schemas/validations';
import { ButtonSize } from 'shared/ui/Button/Button.types';
import { IInputsData } from './OwnerSignUpForm.types';
import { RoutePath } from 'app/providers/AppRouter';
import CustomErrorMessage from 'shared/ui/CustomErrorMessage/CustomErrorMessage';
import { validateErrors } from 'shared/ui/CustomInput/validateErrors';
import { CustomInputControlled } from 'shared/ui/CustomInput/CustomInputControlled';

interface Props {
  handleSubmit: (values: IInputsData, { resetForm }: { resetForm: () => void }) => void;
}
const OwnerSignUpForm = memo(({ handleSubmit }: Props) => {
  return (
    <Formik validationSchema={registrationSchema} onSubmit={handleSubmit} initialValues={INPUTS_STATE}>
      {({ values, setFieldValue }) => {
        return (
          <Form className={styles.form}>
            <section>
              <CustomInputControlled
                setFieldValue={setFieldValue}
                values={values}
                name='campName'
                register
                placeholder='Sparkle Unicorns'
                label='Name your camp'
              />
              <CustomInput name='campId' disabled placeholder='sparkle-unicorns' label='Camp ID' />
              <CustomInput name='city' placeholder='Miami' label='Hometown' />
              <CustomInput name='camp_website' placeholder='www.sparkle-unicorns.org' label='Website' />
            </section>
            <section>
              <div className={styles.flex}>
                <CustomInput name='firstName' placeholder='Cole' label='First Name' />
                <CustomInput name='lastName' placeholder='Sprouse' label='Last Name' />
              </div>
              {inputsDataUser.map(input => (
                <CustomInput values={values} errors={validateErrors(values.password)} key={input.name} {...input} />
              ))}
              <label className={styles.acceptLabel}>
                <Field className={styles.checkbox} type='checkbox' name='accept' />
                <ErrorMessage
                  className={styles.error}
                  name='accept'
                  render={msg => <CustomErrorMessage message={msg} />}
                />

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
        );
      }}
    </Formik>
  );
});

export default OwnerSignUpForm;
