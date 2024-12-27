import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Modal } from '@shared/ui/Modal';
import { Icon, IconSize } from '@shared/ui/Icon';
import FunnelCardAll from '../../ui/FunnelCardAll/FunnelCardAll';
import FunnelCardItem from '../../../FunnelCardItem/FunnelCardItem';
import type { ICamper } from '@entities/Camper';
import styles from './FunnelCard.module.scss';
import FullSizeIcon from '@shared/assets/icons/full-screen_icon.svg';

type FunnelCardProps = {
  className?: string;
  title?: string;
  fluid?: boolean;
  maxUsers?: string | number;
  users: ICamper[];
};

const FunnelCard = memo((props: FunnelCardProps) => {
  const { className, title, fluid, users, maxUsers = 9 } = props;
  const { isOpen, open, close } = useToggle();
  const slicedUsers = users.slice(0, +maxUsers);
  const isAllCardIcon = users.length > +maxUsers;

  const handleClick = () => {
    if (isAllCardIcon) {
      open();
    }
  };

  return (
    <div className={classNames(styles.card, { [styles.fluid]: fluid }, [className])}>
      {title && (
        <div className={classNames(styles.card__head, { [styles.pointer]: isAllCardIcon }, [])} onClick={handleClick}>
          <h3>{title}</h3>
          {isAllCardIcon && <Icon icon={<FullSizeIcon />} size={IconSize.SIZE_20} className={styles.card__icon} />}
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={close}>
          <FunnelCardAll users={users} title={title} />
        </Modal>
      )}
      <ul className={styles.card__content}>
        {slicedUsers.length > 0 && slicedUsers.map(user => (
          <FunnelCardItem key={user.email} user={user} />
        )) || (
          <li className={styles.card__empty}>
            Nobody's rocking this status.
          </li>
        )}
      </ul>
    </div>
  );
});

export default FunnelCard;
