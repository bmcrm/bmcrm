import { memo, useEffect, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import CustomTextarea from 'shared/ui/CustomTextarea/CustomTextarea';
import CustomCheckbox from 'shared/ui/CustomCheckbox/CustomCheckbox';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import Tooltip from 'shared/ui/Tooltip/Tooltip';

import { initialData } from './inputsData';
import { validateErrors } from 'shared/ui/CustomInput/validateErrors';
import { camperRegistrationSchema } from 'shared/const/schemas/validations';
import { type ICamperRegisterForm, type IUserRegisterData } from '../../model/types/auth.types';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { CamperRole } from 'entities/Camper';
import styles from './CamperSignUpForm.module.scss';
import Camp from 'shared/assets/icons/camp.svg';
import ThreeDotIcon from 'shared/assets/icons/three-dot_icon.svg';
import PlusIcon from 'shared/assets/icons/plus_icon.svg';
import MinusIcon from 'shared/assets/icons/minus_icon.svg';

type CamperSignUpFormProps = {
  className?: string;
  onSubmit: (values: IUserRegisterData, resetForm: () => void) => void;
};

const CamperSignUpForm = memo((props: CamperSignUpFormProps) => {
  const { onSubmit } = props;
  const [tooltipsVisible, setTooltipsVisible] = useState<boolean[]>(initialData.social_links.map(() => false));

  useEffect(() => {
    setTooltipsVisible(values => values.length !== initialData.social_links.length
      ? new Array(initialData.social_links.length).fill(false) : values);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.tooltip}`) && !target.closest(`.${styles.social__btn}`)) {
        setTooltipsVisible(tooltipsVisible.map(() => false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipsVisible]);

  const handleTooltipToggle = (index: number) => {
    setTooltipsVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const onSubmitHandler = (values: ICamperRegisterForm, { resetForm }: { resetForm: () => void }) => {
    const data: IUserRegisterData = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      playa_name: values.playa_name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      about_me: values.about_me?.trim(),
      social_links: values.social_links,
      role: CamperRole.LEAD,
    };

    onSubmit(data, resetForm);
  };

  return (
    <Formik validationSchema={camperRegistrationSchema} initialValues={initialData} onSubmit={onSubmitHandler}>
      {({ values }) => {
        return (
          <Form className={styles.form}>
            <div className={styles.form__item}>
              <CustomInput name={'playa_name'} placeholder={'Playa Name'} label={'Playa Name'} />
              <FieldArray name={'social_links'}>
                {({ remove, push }) => (
                  <>
                    {values.social_links.map((_, index: number, arr) => (
                      <div key={index} className={styles.social__wrapper}>
                        {tooltipsVisible[index] && (
                          <Tooltip
                            className={styles.tooltip}
                            properties={{
                              bottom: 'calc(100% - 20px)',
                              right: '30px',
                              width: '150px',
                            }}
                          >
                            <Button
                              className={styles.tooltip__btn}
                              theme={ButtonTheme.CLEAR}
                              size={ButtonSize.TEXT}
                              color={ButtonColor.BLACK}
                              onClick={() => {
                                push('');
                                handleTooltipToggle(index);
                              }}
                              disabled={arr.length > 4}
                            >
                              <span className={styles.tooltip__icon}>
                                <Icon icon={<PlusIcon/>} size={IconSize.SIZE_10}/>
                              </span>
                              Add link
                            </Button>
                            <Button
                              className={styles.tooltip__btn}
                              theme={ButtonTheme.CLEAR}
                              size={ButtonSize.TEXT}
                              color={ButtonColor.BLACK}
                              onClick={() => {
                                remove(index);
                                handleTooltipToggle(index);
                              }}
                              disabled={arr.length < 2}
                            >
                              <span className={styles.tooltip__icon}>
                                <Icon icon={<MinusIcon/>} size={IconSize.SIZE_10}/>
                              </span>
                              Delete
                            </Button>
                          </Tooltip>
                        )}
                        <Button
                          theme={ButtonTheme.CLEAR}
                          size={ButtonSize.TEXT}
                          className={styles.social__btn}
                          onClick={() => handleTooltipToggle(index)}
                        >
                          <Icon icon={<ThreeDotIcon/>} size={IconSize.SIZE_20}/>
                        </Button>
                        <CustomInput
                          name={`social_links.${index}`}
                          placeholder='https://www.facebook.com/'
                          label='Social media link'
                        />
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>
              <CustomTextarea name={'about_me'} placeholder={'Burner from 2021. Working in IT, 29 y.o.'} label={'About you'}/>
            </div>
            <div className={styles.form__item}>
              <div className={styles.form__row}>
                <CustomInput name={'first_name'} placeholder={'Cole'} label={'First Name'}/>
                <CustomInput name={'last_name'} placeholder={'Sprouse'} label={'Last Name'}/>
              </div>
              <CustomInput name={'email'} placeholder={'cole@gmail.com'} label={'Email'} type={'email'}/>
              <CustomInput
                name={'password'}
                placeholder={'∗∗∗∗∗∗∗∗'}
                label={'Password'}
                type={'password'}
                value={values.password}
                errors={validateErrors(values.password)}
                register
              />
              <CustomCheckbox name={'accept'} label={'I agree to the privacy policy'} errorMessage/>
              <Button type='submit' fluid>
                <Camp/>SIGN UP
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});

export default CamperSignUpForm;
