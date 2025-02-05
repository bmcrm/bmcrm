import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Modal } from '@shared/ui/Modal';
import { FunnelCardItem } from '../FunnelCardItem/FunnelCardItem';
import type { ICamper } from '@entities/Camper';
import styles from './CampersModal.module.scss';

type CampersModalProps = {
  className?: string;
  title?: string;
  users: ICamper[];
  isOpen: boolean;
  onClose: () => void;
};

const CampersModal = memo((props: CampersModalProps) => {
  const { className, title, users, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={classNames(styles.card, {}, [className])}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <ul className={styles.card__list}>
          {users.map(user => <FunnelCardItem key={user.email} user={user} />)}
        </ul>
      </div>
    </Modal>
  );
});

export { CampersModal };
