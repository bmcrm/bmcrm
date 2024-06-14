import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import dateNormalize from 'shared/lib/dateNormalize/dateNormalize';
import { useMediaQuery } from 'react-responsive';
import { useToggle } from 'shared/hooks/useToggle/useToggle';

import Icon from 'shared/ui/Icon/Icon';
import Avatar from 'shared/ui/Avatar/Avatar';
import Button from 'shared/ui/Button/Button';
import FormLoader from 'features/FormLoader';
import SocialIconItem from 'shared/ui/SocialIconItem/SocialIconItem';
import AddSocialModal from 'features/AddSocialModal';

import styles from './MemberDetails.module.scss';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { CamperSocial, ICamper } from 'entities/Camper';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import EditIcon from 'icons/edit_icon.svg';
import CheckIcon from 'icons/check.svg';
import ClockIcon from 'icons/clock.svg';
import PlusIcon from 'icons/plus_icon.svg';

interface MemberDetailsProps {
  camperEmail: string | null;
}

const MemberDetails = memo(({ camperEmail }: MemberDetailsProps) => {
  const [camper, setCamper] = useState<ICamper | null>(null);
  const [socialIcons, setSocialIcons] = useState<CamperSocial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadonly, setIsReadonly] = useState(true);
  const { isOpen, open, close } = useToggle();
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
          setSocialIcons(currentCamper.social_links || []);
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
    const updatedCamper = await updateCamper(camperEmail!, { ...values, social_links: socialIcons });

    if (updatedCamper) {
      setCamper(updatedCamper);
      setIsLoading(false);
    }
  }, [camperEmail, socialIcons, toggleReadonly, updateCamper]);

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
    setSocialIcons(camper?.social_links || []);
  }, [camper?.social_links, initialValues, toggleReadonly]);

  const onAddSocialHandler = useCallback((values: CamperSocial) => {
    if (socialIcons.length < 3) {
      setSocialIcons(prev => ([
        ...prev,
        { name: values.name, url: values.url }
      ]));
    }

    close();
  }, [close, socialIcons.length]);

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
                {socialIcons.map((icon, i) => <SocialIconItem key={i} social={icon}/>)}
                {!isReadonly && socialIcons.length < 3 && (
                  <li>
                    <Button
                      theme={ButtonTheme.CLEAR}
                      size={ButtonSize.TEXT}
                      className={classNames(styles.btn, {}, [styles.btnSocial])}
                      onClick={open}
                    >
                      <Icon icon={<PlusIcon/>} size={IconSize.SIZE_10}/>
                    </Button>
                  </li>
                )}
              </ul>
              {isOpen && !isReadonly && <AddSocialModal isOpen={isOpen} onClose={close} onSubmit={onAddSocialHandler}/>}
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
