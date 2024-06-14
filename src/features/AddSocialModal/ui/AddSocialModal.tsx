import { memo } from 'react';
import Modal from 'shared/ui/Modal/Modal';
import { Form, Formik } from 'formik';
import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import CustomSelect from 'shared/ui/CustomSelect/CustomSelect';
import Button from 'shared/ui/Button/Button';

import styles from './AddSocialModal.module.scss';
import { SocialIconsEnum } from 'shared/ui/SocialIconItem/SocialIconItem.types';
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

  const options = Object.values(SocialIconsEnum).map(icon => (
    { value: icon, content: icon.charAt(0).toUpperCase() + icon.slice(1).toLowerCase() }
  ));

  const onSubmitHandler = (values: { socialName: string, url: string }) => {
    const data = {
      url: values.url,
      name: values.socialName,
    };

    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Add Social Media Link</h2>
      <Formik validationSchema={addSocialSchema} onSubmit={onSubmitHandler} initialValues={{ socialName: '', url: '' }}>
        <Form className={styles.form}>
          <CustomSelect name={'socialName'} label={'Name'} options={options}/>
          <CustomInput name={'url'} placeholder={'facebook.com/'} label={'URL'}/>
          <Button type={'submit'} className={'m-centred'}>Add</Button>
        </Form>
      </Formik>
    </Modal>
  );
});

export default AddSocialModal;
