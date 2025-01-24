import { memo, useState, type ReactNode, useEffect } from 'react';
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
  const { camperEmail, isOpen, onClose, theme = CamperDetailsModalTheme.EDIT } = props;
  const [currentTheme, setCurrentTheme] = useState<CamperDetailsModalTheme>(theme);
  const { data: [camper] = [] } = useGetCampers({ camperEmail });

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme, isOpen]);

  const detailsContent: Record<CamperDetailsModalTheme, ReactNode> = {
    [CamperDetailsModalTheme.DEFAULT]: <DetailsDefault camper={camper} setTheme={setCurrentTheme} />,
    [CamperDetailsModalTheme.EDIT]: <DetailsEdit camper={camper} setTheme={setCurrentTheme} />,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      {detailsContent[currentTheme]}
    </Modal>
  );
});

export default CamperDetailsModal;