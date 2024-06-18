import { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { classNames } from 'shared/lib/classNames/classNames';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import CustomCheckbox from 'shared/ui/CustomCheckbox/CustomCheckbox';
import Button from 'shared/ui/Button/Button';

import { initialData, inputsData } from './inputsData';
import { validateErrors } from 'shared/ui/CustomInput/validateErrors';
import { camperRegistrationSchema } from 'shared/const/schemas/validations';
import { ICamperRegisterData, type ICamperRegisterForm } from './CamperSignUpForm.types';
import { CamperRole } from 'entities/Camper';
import styles from './CamperSignUpForm.module.scss';
import Camp from 'shared/assets/icons/camp.svg';

type CamperSignUpFormProps = {
  className?: string;
  onSubmit: (values: ICamperRegisterData, formikHelpers: FormikHelpers<ICamperRegisterForm>) => void;
};

const CamperSignUpForm = memo((props: CamperSignUpFormProps) => {
  const {
    className,
    onSubmit,
  } = props;

  const onSubmitHandler = (values: ICamperRegisterForm, formikHelpers: FormikHelpers<ICamperRegisterForm>) => {
    const data: ICamperRegisterData = {
      firstName: values.firstName,
      lastName: values.lastName,
      playaName: values.playaName,
      email: values.email,
      password: values.password,
      role: CamperRole.LEAD,
    };

    onSubmit(data, formikHelpers);
  };

  return (
    <Formik validationSchema={camperRegistrationSchema} initialValues={initialData} onSubmit={onSubmitHandler}>
      {({ values }) => {
        return (
          <Form className={classNames(styles.form, {}, [className])}>
            <div className={styles.form__row}>
              <CustomInput name='firstName' placeholder='Cole' label='First Name'/>
              <CustomInput name='lastName' placeholder='Sprouse' label='Last Name'/>
            </div>
            {inputsData.map(input => (
              <CustomInput values={values} errors={validateErrors(values.password)} key={input.name} {...input} />
            ))}
            <CustomCheckbox name={'accept'} label={'I agree to the privacy policy'} errorMessage/>
            <Button type='submit' fluid>
              <Camp/>SIGN UP
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
});

export default CamperSignUpForm;
