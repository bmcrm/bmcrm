import { memo, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Form, Formik } from 'formik';
import { useAuth } from 'entities/User';
import useCamp from '../../model/services/useCamp/useCamp';
import { type ICamp } from '../../model/types/camp.types';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import CustomTextarea from 'shared/ui/CustomTextarea/CustomTextarea';
import Image from 'shared/ui/Image/Image';
import Button from 'shared/ui/Button/Button';
import { campSettingsSchema } from 'shared/const/schemas/validations';
import { inputsData } from './inputsData';
import styles from './CampSettingsForm.module.scss';

type CampSettingsFormProps = {
  onSubmit: (values: Partial<ICamp>) => void;
};

const CampSettingsForm = memo(({ onSubmit }: CampSettingsFormProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { decodedIDToken } = useAuth();
  const { getCamp } = useCamp();
  const [campID, setCampID] = useState('');
  const [initialData, setInitialData] = useState<Partial<ICamp>>({
    camp_name: '',
    city: '',
    camp_website: '',
    camp_description: '',
    camp_id: '',
  });

  useEffect(() => {
    const getCampID = async () => {
      if (decodedIDToken && campID !== decodedIDToken.camp_id) {
        setCampID(decodedIDToken.camp_id);
      }
    };

    void getCampID();
  }, [campID, decodedIDToken]);

  useEffect(() => {
    const fetchCamp = async () => {
      if (campID) {
        const currentCamp = await getCamp(campID);

        if (currentCamp) {
          setInitialData(prevState => ({
            ...prevState,
            camp_name: currentCamp.camp_name || '',
            city: currentCamp.city || '',
            camp_website: currentCamp.camp_website || '',
            camp_description: currentCamp.camp_description || '',
            camp_id: currentCamp.camp_id,
          }));
        }
      }
    };

    void fetchCamp();
  }, [campID, getCamp]);

  return (
    <Formik
      validationSchema={campSettingsSchema}
      initialValues={initialData}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className={styles.form}>
        <div className={styles.form__inner}>
          <div className={styles.form__inputs}>
            {inputsData.map(input => (
              <CustomInput key={input.name} {...input} />
            ))}
            <CustomTextarea name={'camp_description'} label={'Description'} placeholder={'Lorem ipsum dolor sit amet...'} />
          </div>
          <Image maxWidth={360} borderRadius={isMobile ? 15 : 30}/>
        </div>
        <Button type={'submit'} className={'m-centred'}>
          Save changes
        </Button>
      </Form>
    </Formik>
  );
});

export default CampSettingsForm;
