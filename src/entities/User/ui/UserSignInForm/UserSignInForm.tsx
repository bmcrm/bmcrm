import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import { SignInInputs, initialValues } from './inputsData';
import Camp from 'shared/assets/icons/camp.svg';
import { type SignInFormData } from './UserSignInForm.types';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { RoutePath } from 'app/providers/AppRouter';
import styles from './UserSignInForm.module.scss';
import { signInSchema } from 'shared/const/schemas/validations';

type SignInFormProps = {
  onSubmit: (values: SignInFormData, { resetForm }: { resetForm: () => void }) => void;
};

const UserSignInForm = memo(({ onSubmit }: SignInFormProps) => {
  return (
    <Formik validationSchema={signInSchema} onSubmit={onSubmit} initialValues={initialValues}>
      <Form className={styles.form}>
        {SignInInputs.map(input => (
          <CustomInput key={input.name} {...input} />
        ))}
        <Link to={RoutePath.reset_pass} className={styles.link}>Forgot Password?</Link>
        <Button type='submit' className={styles.btn} fluid>
          <Icon icon={<Camp />} size={IconSize.SIZE_20} />
          LOG IN
        </Button>
        <p className='redirect-link redirect-link--orange'>
          Don't have an account yet? <br className='br-md'/>
          <Link className='link' to={RoutePath.sign_up}>
            Register and create a camp
          </Link>
        </p>
      </Form>
    </Formik>
  );
});

export default UserSignInForm;
