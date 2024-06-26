import { memo } from 'react';
import socialLinksParser from 'shared/lib/socialLinkParser/socialLinkParser';
import Modal from 'shared/ui/Modal/Modal';
import { Form, Formik } from 'formik';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';

import styles from './AddSocialModal.module.scss';
import { CamperSocial } from 'entities/Camper';
import { addSocialSchema } from 'shared/const/schemas/validations';

type AddSocialModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CamperSocial) => void;
};

const AddSocialModal = memo((props: AddSocialModalProps) => {
  const {
    isOpen,
    onClose,
    onSubmit,
  } = props;

  const onSubmitHandler = (values: { url: string }) => {
    const data = socialLinksParser(values.url);

    onSubmit(data[0]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Add Social Media Link</h2>
      <Formik validationSchema={addSocialSchema} onSubmit={onSubmitHandler} initialValues={{ url: '' }}>
        <Form className={styles.form}>
          <CustomInput name={'url'} placeholder={'facebook.com/'} label={'URL'}/>
          <Button type={'submit'} className={'m-centred'}>Add</Button>
        </Form>
      </Formik>
    </Modal>
  );
});

export default AddSocialModal;
