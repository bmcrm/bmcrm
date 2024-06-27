import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'shared/ui/Modal/Modal';
import Text from 'shared/ui/Text/Text';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import { RoutePath } from 'app/providers/AppRouter';
import { TextAlign, TextSize } from 'shared/ui/Text/Text.types';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import styles from './CampersCountModal.module.scss';
import EyeIcon from 'shared/assets/icons/eye-big.svg';
import CampIcon from 'shared/assets/icons/camp.svg';

type CampersCountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CampersCountModal = memo(({ isOpen, onClose }: CampersCountModalProps) => {
  const navigate = useNavigate();

  const onCLickHandler = useCallback(() => {
    navigate(RoutePath.sign_up, { replace: true });
    onClose();
  }, [navigate, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <span className={styles.content__icon}><EyeIcon/></span>
        <Text title={'Sign up to see the number of campers'} titleSize={TextSize.L} titleAlign={TextAlign.CENTER}/>
        <Button onClick={onCLickHandler} fluid>
          <Icon icon={<CampIcon/>} size={IconSize.SIZE_20}/>SIGN UP
        </Button>
      </div>
    </Modal>
  );
});

export default CampersCountModal;
