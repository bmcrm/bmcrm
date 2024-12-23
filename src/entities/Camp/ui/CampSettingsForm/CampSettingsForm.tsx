import { memo, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useMedia } from '@shared/hooks/useMedia';
import { CustomInput } from '@shared/ui/CustomInput';
import { CustomTextarea } from '@shared/ui/CustomTextarea';
import { Image } from '@shared/ui/Image';
import { Button } from '@shared/ui/Button';
import { useGetCamp } from '../../hooks/useGetCamp';
import { userState } from '@entities/User';
import { campSettingsSchema } from '@shared/const/validationSchemas';
import { inputsData } from '../../model/data/CampSettingsForm.data';
import type { ICamp } from '../../model/types/Camp.types';
import styles from './CampSettingsForm.module.scss';

type CampSettingsFormProps = {
  onSubmit: (values: Partial<ICamp>) => void;
};

const CampSettingsForm = memo(({ onSubmit }: CampSettingsFormProps) => {
  const { isMobile } = useMedia();
  const { tokens: { decodedIDToken } } = userState();
  const [campID, setCampID] = useState('');
  const [initialData, setInitialData] = useState<Partial<ICamp>>({
    camp_name: '',
    city: '',
    camp_website: '',
    camp_description: '',
    camp_id: '',
  });
  const { data: currentCamp, isSuccess } = useGetCamp(campID);

  useEffect(() => {
    const getCampID = async () => {
      if (decodedIDToken && campID !== decodedIDToken.camp_id) {
        setCampID(decodedIDToken.camp_id);
      }
    };

    void getCampID();
  }, [campID, decodedIDToken]);

  useEffect(() => {
    if (isSuccess) {
      setInitialData(prevState => ({
        ...prevState,
        camp_name: currentCamp?.camp_name || '',
        city: currentCamp?.city || '',
        camp_website: currentCamp?.camp_website || '',
        camp_description: currentCamp?.camp_description || '',
        camp_id: currentCamp?.camp_id,
      }));
    }
  }, [isSuccess]);

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
