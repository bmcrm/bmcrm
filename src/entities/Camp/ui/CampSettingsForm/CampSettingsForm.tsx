import { memo, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { useMedia } from '@shared/hooks/useMedia';
import { CustomInput } from '@shared/ui/CustomInput';
import { CustomTextarea } from '@shared/ui/CustomTextarea';
import { Image } from '@shared/ui/Image';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
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
  const { data: currentCamp, isLoading } = useGetCamp({ campID: decodedIDToken!.camp_id, enabled: !!decodedIDToken });

  const initialData = useMemo(() => ({
    camp_id: currentCamp?.camp_id ?? '',
    camp_name: currentCamp?.camp_name ?? '',
    city: currentCamp?.city ?? '',
    camp_website: currentCamp?.camp_website ?? '',
    camp_description: currentCamp?.camp_description ?? '',
  }), [currentCamp]);

  return (
    <>
      <Formik
        validationSchema={campSettingsSchema}
        initialValues={initialData}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form className={styles.form}>
          <div className={styles.form__inner}>
            <div className={styles.form__inputs}>
              {inputsData.map(input => <CustomInput key={input.name} {...input} />)}
              <CustomTextarea name={'camp_description'} label={'Description'} placeholder={'Lorem ipsum dolor sit amet...'} />
            </div>
            <Image maxWidth={360} borderRadius={isMobile ? 15 : 30}/>
          </div>
          <Button type={'submit'} className={'m-centred'}>Save changes</Button>
        </Form>
      </Formik>
      {isLoading && <FormLoader />}
    </>
  );
});

export default CampSettingsForm;
