import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Modal } from '@shared/ui/Modal';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button } from '@shared/ui/Button';
import { socialLinksParser } from '@features/SocialIcon';
import { addSocialSchema } from '@shared/const/validationSchemas';
import type { CamperSocial } from '@entities/Camper';
import styles from './AddSocialModal.module.scss';

type AddSocialModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CamperSocial) => void;
};

const AddSocialModal = memo((props: AddSocialModalProps) => {
  const { isOpen, onClose, onSubmit } = props;

  const onSubmitHandler = useCallback((values: { url: string }) => {
    const data = socialLinksParser(values.url);

    onSubmit(data[0]);
  }, [onSubmit]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Add Social Media Link</h2>
      <Formik validationSchema={addSocialSchema} onSubmit={onSubmitHandler} initialValues={{ url: '' }}>
        <Form className={styles.form}>
          <FormikInput name={'url'} placeholder={'facebook.com/'} label={'URL'}/>
          <Button type={'submit'} className={'m-centred'}>Add</Button>
        </Form>
      </Formik>
    </Modal>
  );
});

export default AddSocialModal;
