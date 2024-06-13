import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';

import Icon from 'shared/ui/Icon/Icon';
import Avatar from 'shared/ui/Avatar/Avatar';
import Button from 'shared/ui/Button/Button';
import { Link } from 'react-router-dom';

import styles from './MemberDetails.module.scss';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { ICamper } from 'entities/Camper/model/types/camper.types';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import X from 'icons/x_icon.svg';
import Facebook from 'icons/fb_icon.svg';
import Instagram from 'icons/inst_icon.svg';
import EditIcon from 'icons/edit_icon.svg';
import CheckIcon from 'icons/check.svg';
import ClockIcon from 'icons/clock.svg';
import { useMediaQuery } from 'react-responsive';
import FormLoader from 'features/FormLoader';
import dateNormalize from 'shared/lib/dateNormalize/dateNormalize.ts';

interface MemberDetailsProps {
  camperEmail: string | null;
}

const MemberDetails = memo(({ camperEmail }: MemberDetailsProps) => {
  const [camper, setCamper] = useState<ICamper | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadonly, setIsReadonly] = useState(true);
  const { getCamper, updateCamper } = useCampers();
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchCamper = async () => {
      if (camperEmail) {
        setIsLoading(true);
        const currentCamper =  await getCamper(camperEmail);

        if (currentCamper) {
          setCamper(currentCamper);
          setIsLoading(false);
        }
      }
    };

    fetchCamper();
  }, [camperEmail, getCamper]);

  const firstLastName = camper?.first_name && camper?.last_name
    ? `${camper?.first_name} ${camper?.last_name}` : undefined;

  const name = camper?.playa_name || firstLastName || camper?.email;

  const capitalizedName = name?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const toggleReadonly = useCallback(() => {
    setIsReadonly(prev => !prev);
  }, []);

  const submitHandler = useCallback(async (values: Partial<ICamper>) => {
    toggleReadonly();
    setIsLoading(true);
    const updatedCamper = await updateCamper(camperEmail!, { ...values });

    if (updatedCamper) {
      setCamper(updatedCamper);
      setIsLoading(false);
    }
  }, [camperEmail, toggleReadonly, updateCamper]);

  const initialValues = useMemo(() => ({
    summary: camper?.summary || '',
    history: camper?.history?.map(item => ({
      year: item.year,
      value: item.value,
    })) || [{ year: currentYear, value: '' }],
  }), [camper, currentYear]);

  const cancelHandler = useCallback((resetForm: FormikHelpers<Partial<ICamper>>['resetForm']) => {
    toggleReadonly();
    resetForm({ values: initialValues });
  }, [initialValues, toggleReadonly]);

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
      {({ resetForm }) => (
        <Form className={classNames(styles.details, {}, [])}>
          {isLoading && <FormLoader style={{ backgroundColor: 'white' }}/>}
          <section className={styles.details__head}>
            <Avatar
              src={camper?.avatar || null}
              alt={name}
              size={isTablet ? 70 : 125}
              className={styles.details__avatar}
            />
            <div className={styles.details__headRow}>
              <div className={styles.details__headTitle}>
                <h2>{capitalizedName}</h2>
                <div className={styles.details__headTitleIcons}>
                  <Icon
                    icon={camper?.email_confirmed ? <CheckIcon/> : <ClockIcon/>}
                    size={IconSize.SIZE_24}
                    style={{ color: camper?.email_confirmed ? '#4ECB71' : '#C1C1C1' }}
                  />
                  {isReadonly && (
                    <Button
                      theme={ButtonTheme.CLEAR}
                      size={ButtonSize.TEXT}
                      className={styles.btn}
                      onClick={toggleReadonly}
                    >
                      <Icon icon={<EditIcon/>} size={IconSize.SIZE_24} style={{ color: '#C1C1C1' }}/>
                    </Button>
                  )}
                </div>
              </div>
              <ul className={styles.details__socials}>
                <li>
                  <Link to={'https://x.com/'} target={'_blank'} className={styles.link}>
                    <Icon icon={<X/>} size={isTablet ? IconSize.SIZE_14 : IconSize.SIZE_24}/>
                  </Link>
                </li>
                <li>
                  <Link to={'https://www.facebook.com/'} target={'_blank'} className={styles.link}>
                    <Icon icon={<Facebook/>} size={isTablet ? IconSize.SIZE_14 : IconSize.SIZE_24}/>
                  </Link>
                </li>
                <li>
                  <Link to={'https://www.instagram.com/'} target={'_blank'} className={styles.link}>
                    <Icon icon={<Instagram/>} size={isTablet ? IconSize.SIZE_14 : IconSize.SIZE_24}/>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.details__headInfo}>
              {!isTablet && <p className={styles.email}>{camper?.email}</p>}
              <div className={styles.details__headDesc}>
                <p>{camper?.city || 'Not specified'}</p>
                <p>Added: {dateNormalize(camper?.created_at as string)}</p>
                <p>BMs: 2022, 2023</p>
                <p>Updated: { dateNormalize(camper?.updated_at as string) }</p>
              </div>
            </div>
          </section>
          <section>
            <h3 className={styles.blockTitle}>Summary</h3>
            {isReadonly ? <p>{camper?.summary}</p> : (
              <Field
                as={'textarea'}
                name={'summary'}
                readOnly={isReadonly}
                className={styles.textarea}
              />
            )}
          </section>
          <section>
            <h3 className={styles.blockTitle}>History</h3>
            <FieldArray name='history'>
              {() => (
                <ul className={styles.details__history}>
                  {initialValues.history.map((item, index) => (
                    <li key={index} className={styles.details__historyItem}>
                      <Field
                        type={'text'}
                        readOnly={true}
                        name={`history.${index}.year`}
                        className={styles.year}
                      />
                      {isReadonly ? (<p>{item.value}</p>) : index === 0 ? (
                        <Field
                          as={'textarea'}
                          name={`history.${index}.value`}
                          className={styles.textarea}
                        />
                      ) : (<p>{item.value}</p>)}
                    </li>
                  ))}
                </ul>
              )}
            </FieldArray>
          </section>
          {!isReadonly && (
            <div className={styles.details__buttons}>
              <Button type={'submit'}>
                Save
              </Button>
              <Button
                theme={ButtonTheme.CLEAR}
                size={ButtonSize.TEXT}
                color={ButtonColor.NEUTRAL}
                onClick={() => cancelHandler(resetForm)}
              >
                Cancel
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
});

export default MemberDetails;
