import { Form, Formik } from 'formik';

import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';
import Modal from 'shared/ui/Modal/Modal';
import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import FormLoader from 'features/FormLoader';

import styles from './UserConfirmModal.module.scss';
import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types.ts';
import { confirmUserSchema } from 'shared/lib/schemas/validations.ts';
import toast from 'react-hot-toast';
import { useAuth } from 'entities/User';

type UserConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

type valuesType = {
  code: string;
};

const UserConfirmModal = (props: UserConfirmModalProps) => {
  const {
    isOpen,
    onClose,
    email,
  } = props;
  const { confirm, isLoading } = useAuth(state => ({
    confirm: state.confirm,
    isLoading: state.isLoading,
  }));

  const onSubmit = async (values: valuesType) => {
    const data = {
      email: email,
      ...values,
    };

    try {
      const response = await confirm(data);

      if (response.$metadata.httpStatusCode === 200) {
        onClose();
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'CodeMismatchException') {
        toast.error('Invalid verification code provided, please try again!', { duration: 4000, position: 'top-center' });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Formik validationSchema={confirmUserSchema} onSubmit={onSubmit} initialValues={{ code: '' }}>
        <Form className={styles.confirmForm}>
          <AuthBadge label={'Account Verification'}/>
          <p>Please check your email to verify your account.</p>
          <CustomInput name={'code'} placeholder={'--- ---'} label={'Code'}/>
          <Button type={'submit'} fluid className={'mt-15'}>
            <Icon icon={<Camp />} size={IconSize.SIZE_20} />VERIFY
          </Button>
        </Form>
      </Formik>
      {isLoading && <FormLoader/>}
    </Modal>
  );
};

export default UserConfirmModal;
