import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import { SignInInputs, initialValues } from './inputsData';
import Camp from 'shared/assets/icons/camp.svg';
import { type SignInFormData } from './UserSignInForm.types';
import { IconSize } from 'shared/ui/Icon/IconTypes';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import { RoutePath } from 'app/providers/AppRouter';
import styles from './UserSignInForm.module.scss';
import { signInSchema } from 'shared/lib/schemas/schemas';

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
        <Button theme={ButtonTheme.CLEAR} size={ButtonSize.TEXT} color={ButtonColor.RUBY_LIGHT}>
          Forgot Password?
        </Button>
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
