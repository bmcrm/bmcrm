import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import { inputsData } from './inputsData';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { RoutePath } from 'app/providers/AppRouter';
import { signInSchema } from 'shared/const/schemas/validations';
import { type ILoginData } from '../../model/types/auth.types.ts';
import styles from './UserSignInForm.module.scss';
import Camp from 'shared/assets/icons/camp.svg';

type SignInFormProps = {
  initialValues: ILoginData;
  onSubmit: (values: ILoginData, formikHelpers: FormikHelpers<ILoginData>) => void;
};

const UserSignInForm = memo(({ onSubmit, initialValues }: SignInFormProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (initialValues.email && initialValues.password) {
      ref.current?.click();
    }
  }, []);
  return (
    <Formik validationSchema={signInSchema} onSubmit={onSubmit} initialValues={initialValues}>
      <Form className={styles.form}>
        {inputsData.map(input => (
          <CustomInput key={input.name} {...input} />
        ))}
        <Link to={RoutePath.reset_pass} className={styles.link}>
          Forgot Password?
        </Link>
        <Button ref={ref} type='submit' className={styles.btn} fluid>
          <Icon icon={<Camp />} size={IconSize.SIZE_20} />
          LOG IN
        </Button>
        <p className='redirect-link redirect-link--orange'>
          Don't have an account yet? <br className='br-md' />
          <Link className='link' to={RoutePath.sign_up}>
            Register and create a camp
          </Link>
        </p>
      </Form>
    </Formik>
  );
});

export default UserSignInForm;
