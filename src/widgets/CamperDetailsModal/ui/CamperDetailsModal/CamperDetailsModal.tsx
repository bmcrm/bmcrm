import { memo, useState, type ReactNode } from 'react';
import { Modal } from '@shared/ui/Modal';
import { DetailsDefault } from '../DetailsDefault/DetailsDefault';
import { DetailsEdit } from '../DetailsEdit/DetailsEdit';
import { useGetCampers } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './CamperDetailsModal.module.scss';

interface CamperDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  camperEmail: string;
  theme?: CamperDetailsModalTheme;
}

const CamperDetailsModal = memo((props: CamperDetailsModalProps) => {
  const { camperEmail, isOpen, onClose, theme = CamperDetailsModalTheme.DEFAULT } = props;
  const [currentTheme, setCurrentTheme] = useState<CamperDetailsModalTheme>(theme);
  const { data: [camper] = [] } = useGetCampers({ camperEmail });

  const detailsContent: Record<CamperDetailsModalTheme, ReactNode> = {
    [CamperDetailsModalTheme.DEFAULT]: <DetailsDefault camper={camper} setTheme={setCurrentTheme} />,
    [CamperDetailsModalTheme.EDIT]: <DetailsEdit />,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      {detailsContent[currentTheme]}
    </Modal>
  );
});

// const CamperDetailsModal = memo((props: CamperDetailsModalProps) => {
//   const { camperEmail, isDetailsOpen, onDetailsClose } = props;
//   const {
//     camper,
//     socialIcons,
//     decodedIDToken,
//     isLoading,
//     isReadonly,
//     initialValues,
//     toggleReadonly,
//     submitHandler,
//     handleCancel,
//     setSocialIcons,
//   } = useCamperDetailsModal({ camperEmail, onDetailsClose, isDetailsOpen });
//
//   return (
//     <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
//       <Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
//         <Form className={styles.details}>
//           {isLoading && <FormLoader style={{ backgroundColor: 'var(--color-white)' }} />}
//           <CamperDetailsHeader
//             camper={camper}
//             isReadonly={isReadonly}
//             socialIcons={socialIcons}
//             toggleReadonly={toggleReadonly}
//             setSocialIcons={setSocialIcons}
//           />
//           <CamperDetailsStatus
//             camper={camper}
//             isReadonly={isReadonly}
//             decodedIDToken={decodedIDToken}
//           />
//           <CamperDetailsAboutMe camper={camper} isReadonly={isReadonly} />
//           <CamperDetailsHistory initialValues={initialValues} isReadonly={isReadonly} />
//           {!isReadonly && <CamperDetailsButtons handleCancel={handleCancel} />}
//         </Form>
//       </Formik>
//     </Modal>
//   );
// });

export default CamperDetailsModal;
