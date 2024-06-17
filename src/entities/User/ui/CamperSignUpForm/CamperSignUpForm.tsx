import { memo } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { classNames } from 'shared/lib/classNames/classNames';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import CustomErrorMessage from 'shared/ui/CustomErrorMessage/CustomErrorMessage';

import styles from './CamperSignUpForm.module.scss';
import { initialData, inputsData } from './inputsData';
import { validateErrors } from 'shared/ui/CustomInput/validateErrors';
import Camp from 'shared/assets/icons/camp.svg';

type CamperSignUpFormProps = {
  className?: string;
};

const CamperSignUpForm = memo((props: CamperSignUpFormProps) => {
  const {
    className,
  } = props;

  // @ts-ignore
  const onSubmitHandler = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialData} onSubmit={onSubmitHandler}>
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
            <label className={styles.acceptLabel}>
              <Field className={styles.checkbox} type='checkbox' name='accept'/>
              <ErrorMessage
                className={styles.error}
                name='accept'
                render={msg => <CustomErrorMessage message={msg}/>}
              />
              <span className={styles.checkmark}/>
              <p>I agree to the privacy policy</p>
            </label>
            <Button type='submit' fluid>
              <Camp/>
              SIGN UP
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
});

export default CamperSignUpForm;
