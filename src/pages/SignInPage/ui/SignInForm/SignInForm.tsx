import { Formik } from 'formik';
import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import { SignInInputs } from './SignInFormData';
import { type SignInFormData } from './SignInForm.types';
import styles from './SignInForm.module.scss';
import Button from 'shared/ui/Button/Button.tsx';
import Icon from 'shared/ui/Icon/Icon.tsx';
import Camp from 'shared/assets/icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/IconTypes';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types.ts';

type SignInFormProps = {
  onSubmit: (values: SignInFormData) => void;
  initialValues: SignInFormData;
};

const SignInForm = (props: SignInFormProps) => {
  const {
    initialValues,
    onSubmit,
  } = props;

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      <form className={styles.form}>
        {SignInInputs.map(input => (
          <CustomInput key={input.name} {...input} />
        ))}
        <Button
          theme={ButtonTheme.CLEAR}
          size={ButtonSize.TEXT}
          color={ButtonColor.RUBY_LIGHT}
        >
          Forgot Password?
        </Button>
        <Button type='submit' fluid>
          <Icon icon={<Camp/>} size={IconSize.SIZE_20}/>
          LOG IN
        </Button>
        <p className={styles.form__redirect}>
          Don't have an account yet? <Link className={styles.link} to={RoutePath.register}>Register and create a camp</Link>
        </p>
      </form>
    </Formik>
  );
};

export default SignInForm;
