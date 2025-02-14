import { memo } from 'react';
import { Modal } from '@shared/ui/Modal';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import styles from './CampersCountModal.module.scss';
import EyeIcon from '@shared/assets/icons/eye-big.svg';
import CampIcon from '@shared/assets/icons/camp.svg';

type CampersCountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onScroll?: () => void;
};

const CampersCountModal = memo(({ isOpen, onClose, onScroll }: CampersCountModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={styles.content}>
      <span className={styles.content__icon}><EyeIcon /></span>
      <Text title={'Sign up to see the number of campers'} titleSize={TextSize.L} titleAlign={TextAlign.CENTER} />
      <Button onClick={onScroll} fluid>
        <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />SIGN UP
      </Button>
    </div>
  </Modal>
));

export default CampersCountModal;
