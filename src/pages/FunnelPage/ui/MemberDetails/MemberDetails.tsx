import { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Field, FieldArray, Form, Formik } from 'formik';

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

interface MemberDetailsProps {
  camperEmail: string | null;
}

const MemberDetails = memo(({ camperEmail }: MemberDetailsProps) => {
  const [camper, setCamper] = useState<ICamper | null>(null);
  const [isReadonly, setIsReadonly] = useState(true);
  const { getCamper, updateCamper } = useCampers();
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const currentYear = new Date().getFullYear();
  const initialValues = {
    summary: camper?.summary ? camper?.summary : '',
    history: camper?.history
      ? camper?.history?.map((item) => ({
        year: item.year,
        text: item.text,
      }))
      : [{ year: currentYear, text: '' }],
  };

  useEffect(() => {
    const fetchCamper = async () => {
      if (camperEmail) {
        const currentCamper =  await getCamper(camperEmail);

        if (currentCamper) {
          setCamper(currentCamper);
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

  const submitHandler = useCallback((values: Partial<ICamper>) => {
    toggleReadonly();
    updateCamper(camperEmail!, { ...values });
  }, [camperEmail, toggleReadonly, updateCamper]);

  const cancelHandler = useCallback(() => {
    toggleReadonly();
  }, [toggleReadonly]);

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form className={classNames(styles.details, {}, [])}>
        <section className={styles.details__head}>
          <Avatar
            src={camper?.avatar ? camper?.avatar : null}
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
              <p>{camper?.city ? camper?.city : 'Not specified'}</p>
              <p>Added: 01.01.2020</p>
              <p>BMs: 2022, 2023</p>
              <p>Updated: 01.01.2020</p>
            </div>
          </div>
        </section>
        <section>
          <h3 className={styles.blockTitle}>Summary</h3>
          {isReadonly && <p>{camper?.summary}</p>}
          {!isReadonly && (
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
                {camper?.history?.map((item, index) => (
                  <li key={index} className={styles.details__historyItem}>
                    <Field
                      type={'text'}
                      readOnly={true}
                      name={`history.${index}.year`}
                      className={styles.year}
                    />
                    {isReadonly ? (
                      <p>{item.text}</p>
                    ) : index === 0 ? (
                      <Field
                        as={'textarea'}
                        name={`history.${index}.text`}
                        className={styles.textarea}
                      />
                    ) : (
                      <p>{item.text}</p>
                    )}
                  </li>
                ))}
                {!camper?.history && !isReadonly && (
                  <li className={styles.details__historyItem}>
                    <Field
                      type='text'
                      readOnly={true}
                      name={'history.0.year'}
                      className={styles.year}
                    />
                    <Field
                      as='textarea'
                      name={'history.0.text'}
                      className={styles.textarea}
                    />
                  </li>
                )}
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
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        )}
      </Form>
    </Formik>
  );
});

export default MemberDetails;
