import { memo, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Formik, type FormikHelpers } from 'formik';
import { CustomInput } from '@shared/ui/CustomInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { inputsData } from '../../model/data/UserLoginForm.data';
import { RoutePath } from '@app/providers/AppRouter';
import { signInSchema } from '@shared/const/validationSchemas';
import { type ILoginData } from '../../model/types/User.types';
import styles from './UserLoginForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

type UserLoginFormProps = {
  initialValues: ILoginData;
  onSubmit: (values: ILoginData, formikHelpers: FormikHelpers<ILoginData>) => void;
};

const UserLoginForm = memo(({ onSubmit, initialValues }: UserLoginFormProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email && location.state?.password) {
      ref.current?.click();
    }
  }, [location.state?.email, location.state?.password]);

  return (
    <Formik validationSchema={signInSchema} onSubmit={onSubmit} initialValues={initialValues}>
      <Form className={styles.form}>
        {inputsData.map(input => (
          <CustomInput key={input.name} {...input} />
        ))}
        <Link to={RoutePath.reset_pass} className={styles.link}>
          Forgot Password?
        </Link>
        <Button ref={ref} type={'submit'} className={styles.btn} fluid>
          <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
          LOG IN
        </Button>
        <p className='redirect-link redirect-link--orange'>
          Don't have an account yet? <br className={'br-md'} />
          <Link className={'link'} to={RoutePath.registration}>
            Register and create a camp
          </Link>
        </p>
      </Form>
    </Formik>
  );
});

export default UserLoginForm;
