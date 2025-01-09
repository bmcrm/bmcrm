import { memo } from 'react';
import { Form, Formik } from 'formik';
import { FormLoader } from '@features/FormLoader';
import { Modal } from '@shared/ui/Modal';
import { CamperDetailsHeader } from '../CamperDetailsHeader/CamperDetailsHeader';
import { CamperDetailsStatus } from '../CamperDetailsStatus/CamperDetailsStatus';
import { CamperDetailsAboutMe } from '../CamperDetailsAboutMe/CamperDetailsAboutMe';
import { CamperDetailsHistory } from '../CamperDetailsHistory/CamperDetailsHistory';
import { CamperDetailsButtons } from '../CamperDetailsButtons/CamperDetailsButtons';
import { useCamperDetailsModal } from '../../hooks/useCamperDetailsModal';
import styles from './CamperDetailsModal.module.scss';

interface CamperDetailsModalProps {
  camperEmail: string;
  isDetailsOpen: boolean;
  onDetailsClose: () => void;
}

const CamperDetailsModal = memo((props: CamperDetailsModalProps) => {
  const { camperEmail, isDetailsOpen, onDetailsClose } = props;
  const {
    camper,
    socialIcons,
    decodedIDToken,
    isLoading,
    isReadonly,
    initialValues,
    toggleReadonly,
    submitHandler,
    handleCancel,
    setSocialIcons,
  } = useCamperDetailsModal({ camperEmail, onDetailsClose });

  return (
    <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
      <Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
        <Form className={styles.details}>
          {isLoading && <FormLoader style={{ backgroundColor: 'var(--color-white)' }} />}
          <CamperDetailsHeader
            camper={camper}
            isReadonly={isReadonly}
            socialIcons={socialIcons}
            toggleReadonly={toggleReadonly}
            setSocialIcons={setSocialIcons}
          />
          <CamperDetailsStatus
            camper={camper}
            isReadonly={isReadonly}
            decodedIDToken={decodedIDToken}
          />
          <CamperDetailsAboutMe camper={camper} isReadonly={isReadonly} />
          <CamperDetailsHistory initialValues={initialValues} isReadonly={isReadonly} />
          {!isReadonly && <CamperDetailsButtons handleCancel={handleCancel} />}
        </Form>
      </Formik>
    </Modal>
  );
});

export default CamperDetailsModal;
