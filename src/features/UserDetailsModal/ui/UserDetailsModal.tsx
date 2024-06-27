import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import dateNormalize from 'shared/lib/dateNormalize/dateNormalize';
import { useMediaQuery } from 'react-responsive';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import errorHandler from 'shared/lib/errorHandler/errorHandler';
import { AxiosError } from 'axios';
import { useAuth } from 'entities/User';

import Icon from 'shared/ui/Icon/Icon';
import Avatar from 'shared/ui/Avatar/Avatar';
import Button from 'shared/ui/Button/Button';
import FormLoader from 'features/FormLoader';
import SocialIconItem from 'shared/ui/SocialIconItem/SocialIconItem';
import AddSocialModal from 'features/AddSocialModal';
import Modal from 'shared/ui/Modal/Modal';
import CustomTextarea from 'shared/ui/CustomTextarea/CustomTextarea';
import CustomSelect from 'shared/ui/CustomSelect/CustomSelect';

import styles from './UserDetailsModal.module.scss';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { CamperRole, CamperSocial, ICamper } from 'entities/Camper';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import EditIcon from 'icons/edit_icon.svg';
import CheckIcon from 'icons/check.svg';
import ClockIcon from 'icons/clock.svg';
import PlusIcon from 'icons/plus_icon.svg';

interface UserDetailsModalProps {
  camperEmail: string | null;
  isDetailsOpen: boolean;
  onDetailsClose: () => void;
}

const UserDetailsModal = memo((props: UserDetailsModalProps) => {
  const { camperEmail, isDetailsOpen, onDetailsClose } = props;
  const [camper, setCamper] = useState<ICamper | null>(null);
  const [socialIcons, setSocialIcons] = useState<CamperSocial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadonly, setIsReadonly] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const { isOpen, open, close } = useToggle();
  const { getCamper, updateCamper, isError, resetError, getCampers } = useCampers();
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const currentYear = new Date().getFullYear();
  const { decodedIDToken } = useAuth();

  useEffect(() => {
    if (isError) {
      errorHandler(isError as AxiosError);
    }

    return resetError();
  }, [isError, resetError]);

  useEffect(() => {
    const fetchCamper = async () => {
      if (camperEmail) {
        setIsLoading(true);
        const currentCamper = await getCamper(camperEmail);

        if (currentCamper) {
          setCamper(currentCamper);
          setSocialIcons(currentCamper.social_links || []);
          setIsLoading(false);
        }
      }
    };

    void fetchCamper();
  }, [camperEmail, getCamper]);

  const firstLastName =
    camper?.first_name && camper?.last_name ? `${camper?.first_name} ${camper?.last_name}` : undefined;

  const name = camper?.playa_name || firstLastName || camper?.email;

  const capitalizedName = name
    ?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const toggleReadonly = useCallback(() => {
    setIsReadonly(prev => !prev);
  }, []);

  const removeExtraSpaces = (str: string) => {
    return str.replace(/[ \t]+/g, ' ').trim();
  };

  const trimFields = useCallback((values: Partial<ICamper>): Partial<ICamper> => {
    return {
      about_me: values.about_me ? removeExtraSpaces(values.about_me) : '',
      history: values.history?.map(item => ({
        ...item,
        value: item.value ? removeExtraSpaces(item.value) : '',
      })),
    };
  }, []);

  const submitHandler = useCallback(async (values: Partial<ICamper>) => {
    setIsLoading(true);
    toggleReadonly();
    const trimmedValues = trimFields(values);

    const data = {
      ...trimmedValues,
      ...(values.role !== CamperRole.TCO && decodedIDToken?.role === CamperRole.TCO ? { role: values.role } : {})
    };

    const updatedCamper = await updateCamper(camperEmail!, { ...data, social_links: socialIcons });

    if (updatedCamper) {
      setCamper(updatedCamper);
      setIsEdited(true);
    }

    setIsLoading(false);
  },
  [camperEmail, decodedIDToken?.role, socialIcons, toggleReadonly, trimFields, updateCamper]
  );

  const initialValues = useMemo(
    () => ({
      about_me: camper?.about_me || '',
      history: camper?.history?.map(item => ({
        year: item.year,
        value: item.value,
      })) || [{ year: currentYear, value: '' }],
      role: camper?.role,
    }),
    [camper?.about_me, camper?.history, camper?.role, currentYear]
  );

  const cancelHandler = useCallback(
    (resetForm: FormikHelpers<Partial<ICamper>>['resetForm']) => {
      toggleReadonly();
      resetForm({ values: initialValues });
      setSocialIcons(camper?.social_links || []);
    },
    [camper?.social_links, initialValues, toggleReadonly]
  );

  const onAddSocialHandler = useCallback(
    (values: CamperSocial) => {
      if (socialIcons.length < 5) {
        setSocialIcons(prev => [...prev, { name: values.name, url: values.url }]);
      }

      close();
    },
    [close, socialIcons.length]
  );

  const onRemoveSocialHandler = useCallback((index: number) => {
    setSocialIcons(prev => prev.filter((_, i) => i !== index));
  }, []);

  const selectOptions = Object.values(CamperRole)
    .filter(role => role !== CamperRole.TCO)
    .map(role => ({
      value: role,
      content: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
    }));

  const closeDetailsHandler = () => {
    if (isEdited) {
      void getCampers();
    }

    onDetailsClose();
  };

  return (
    <Modal isOpen={isDetailsOpen} onClose={closeDetailsHandler}>
      <Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
        {({ resetForm }) => (
          <Form className={classNames(styles.details, {}, [])}>
            {isLoading && <FormLoader style={{ backgroundColor: 'white' }} />}
            <section className={styles.details__head}>
              <Avatar
                src={camper?.avatar || null}
                alt={name}
                size={isTablet ? 70 : 125}
                className={styles.details__avatar}
              />
              <div className={styles.details__headHeading}>
                <div className={styles.details__headTitle}>
                  <h2>{capitalizedName}</h2>
                  <div className={styles.details__headTitleIcons}>
                    <Icon
                      icon={camper?.email_confirmed ? <CheckIcon /> : <ClockIcon />}
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
                        <Icon icon={<EditIcon />} size={IconSize.SIZE_24} style={{ color: '#C1C1C1' }} />
                      </Button>
                    )}
                  </div>
                </div>
                <ul className={styles.details__socials}>
                  {socialIcons.map((icon, i) => (
                    <SocialIconItem key={i} social={icon} readonly={isReadonly} onRemove={() => onRemoveSocialHandler(i)}/>
                  ))}
                  {!isReadonly && socialIcons.length < 5 && (
                    <li>
                      <Button
                        theme={ButtonTheme.CLEAR}
                        size={ButtonSize.TEXT}
                        className={classNames(styles.btn, {}, [styles.btnSocial])}
                        onClick={open}
                      >
                        <Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
                      </Button>
                    </li>
                  )}
                </ul>
                {isOpen && !isReadonly && (
                  <AddSocialModal isOpen={isOpen} onClose={close} onSubmit={onAddSocialHandler} />
                )}
              </div>
              <div className={styles.details__headInfo}>
                {!isTablet && (
                  <a href={`mailto: ${camper?.email}`} className={styles.email}>{camper?.email}</a>
                )}
                <div className={styles.details__headDesc}>
                  {camper?.city && <p>{camper?.city}</p>}
                  <p>Added: {dateNormalize(camper?.created_at as string)}</p>
                  <p>BMs: 2022, 2023</p>
                  <p>Updated: {dateNormalize(camper?.updated_at as string)}</p>
                </div>
              </div>
            </section>
            <section className={styles.status}>
              {(isReadonly || decodedIDToken?.role !== CamperRole.TCO || camper?.role === CamperRole.TCO) && (
                <p
                  className={classNames(styles.status__role, { [styles.tco]: camper?.role === CamperRole.TCO }, [])}
                >
                  {camper?.role}
                </p>
              )}
              {!isReadonly && decodedIDToken?.role === CamperRole.TCO && camper?.role !== CamperRole.TCO && (
                <CustomSelect name={'role'} options={selectOptions} className={styles.status__select}/>
              )}
            </section>
            <section>
              <h3 className={styles.blockTitle}>About Me</h3>
              {isReadonly ? (
                <p className={styles.text}>{camper?.about_me}</p>
              ) : (
                <CustomTextarea name={'about_me'} readonly={isReadonly} className={styles.textarea}/>
              )}
            </section>
            <section>
              <h3 className={styles.blockTitle}>Campers Notes</h3>
              <FieldArray name='history'>
                {() => (
                  <ul className={styles.details__history}>
                    {initialValues.history.map((item, index) => (
                      <li key={index} className={styles.details__historyItem}>
                        <Field type={'text'} readOnly={true} name={`history.${index}.year`} className={styles.year} />
                        {isReadonly ? (
                          <p className={styles.text}>{item.value}</p>
                        ) : index === 0 ? (
                          <CustomTextarea name={`history.${index}.value`} readonly={isReadonly} className={styles.textarea}/>
                        ) : (
                          <p className={styles.text}>{item.value}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </FieldArray>
            </section>
            {!isReadonly && (
              <div className={styles.details__buttons}>
                <Button type={'submit'}>Save</Button>
                <Button
                  className={styles.btnCancel}
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
    </Modal>
  );
});

export default UserDetailsModal;
