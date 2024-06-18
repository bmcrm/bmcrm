import { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import CustomInputControlled from 'shared/ui/CustomInput/CustomInputControlled';
import Button from 'shared/ui/Button/Button';
import CustomCheckbox from 'shared/ui/CustomCheckbox/CustomCheckbox';

import { initialData, inputsData } from './inputsData';
import styles from './TCOSignUpForm.module.scss';
import { registrationSchema } from 'shared/const/schemas/validations';
import { RoutePath } from 'app/providers/AppRouter';
import { validateErrors } from 'shared/ui/CustomInput/validateErrors';
import { type ITCORegisterForm, IUserRegisterData } from '../../model/types/auth.types.ts';
import { CamperRole } from 'entities/Camper';
import Camp from 'shared/assets/icons/camp.svg';

interface TCOSignUpFormProps {
  onSubmit: (values: IUserRegisterData, formikHelpers: FormikHelpers<ITCORegisterForm>) => void;
}

const TCOSignUpForm = memo(({ onSubmit }: TCOSignUpFormProps) => {

  const onSubmitHandler = (values: ITCORegisterForm, formikHelpers: FormikHelpers<ITCORegisterForm>) => {
    const data: IUserRegisterData = {
      camp_name: values.camp_name,
      camp_id: values.camp_id,
      camp_website: values.camp_website,
      city: values.city,
      first_name: values.first_name,
      last_name: values.last_name,
      playa_name: values.playa_name,
      email: values.email,
      password: values.password,
      role: CamperRole.TCO,
    };

    onSubmit(data, formikHelpers);
  };

  return (
    <Formik validationSchema={registrationSchema} onSubmit={onSubmitHandler} initialValues={initialData}>
      {({ values, setFieldValue }) => {
        return (
          <Form className={styles.form}>
            <section>
              <CustomInputControlled
                setFieldValue={setFieldValue}
                values={values}
                name='camp_name'
                placeholder='Sparkle Unicorns'
                label='Name your camp'
              />
              <CustomInput name='camp_id' disabled placeholder='sparkle-unicorns' label='Camp ID' />
              <CustomInput name='city' placeholder='Miami' label='Hometown' />
              <CustomInput name='camp_website' placeholder='www.sparkle-unicorns.org' label='Website' />
            </section>
            <section>
              <div className={styles.flex}>
                <CustomInput name='first_name' placeholder='Cole' label='First Name' />
                <CustomInput name='last_name' placeholder='Sprouse' label='Last Name' />
              </div>
              {inputsData.map(input => (
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
