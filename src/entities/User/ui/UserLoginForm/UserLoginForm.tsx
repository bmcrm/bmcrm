import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, type FormikHelpers } from 'formik';
import { CustomInput } from '@shared/ui/CustomInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { inputsData } from '../../model/data/UserLoginForm.data';
import { RoutePath } from '@app/providers/AppRouter';
import { loginSchema } from '@shared/const/validationSchemas';
import { type ILoginData } from '../../model/types/User.types';
import styles from './UserLoginForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

type UserLoginFormProps = {
  onSubmit: (values: ILoginData, formikHelpers: FormikHelpers<ILoginData>) => void;
};

const UserLoginForm = memo(({ onSubmit }: UserLoginFormProps) => (
  <Formik validationSchema={loginSchema} onSubmit={onSubmit} initialValues={{ email: '', password: '' }}>
    <Form className={styles.form}>
      {inputsData.map(input => (
        <CustomInput key={input.name} {...input} />
      ))}
      <Link to={RoutePath.reset_pass} className={styles.link}>
        Forgot Password?
      </Link>
      <Button type={'submit'} className={styles.btn} fluid>
        <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
        LOG IN
      </Button>
      <p className={'redirect-link redirect-link--orange'}>
        Don't have an account yet? <br className={'br-md'} />
        <Link className={'link'} to={RoutePath.registration}>
          Register and create a camp
        </Link>
      </p>
    </Form>
  </Formik>
));

export default UserLoginForm;
