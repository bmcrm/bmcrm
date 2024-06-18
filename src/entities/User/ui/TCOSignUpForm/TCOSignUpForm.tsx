import { memo } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import CustomInputControlled from 'shared/ui/CustomInput/CustomInputControlled';
import Button from 'shared/ui/Button/Button';
import CustomCheckbox from 'shared/ui/CustomCheckbox/CustomCheckbox';
import Camp from 'shared/assets/icons/camp.svg';

import { INPUTS_STATE, inputsDataUser } from './inputsData';
import styles from './TCOSignUpForm.module.scss';
import { registrationSchema } from 'shared/const/schemas/validations';
import { IInputsData } from './TCOSignUpForm.types';
import { RoutePath } from 'app/providers/AppRouter';
import { validateErrors } from 'shared/ui/CustomInput/validateErrors';

interface TCOSignUpFormProps {
  handleSubmit: (values: IInputsData, { resetForm }: { resetForm: () => void }) => void;
}

const TCOSignUpForm = memo(({ handleSubmit }: TCOSignUpFormProps) => {
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
              <CustomCheckbox name={'accept'} label={'I agree to the privacy policy'} errorMessage/>
              <Button type='submit' fluid>
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

export default TCOSignUpForm;
