import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

import Loader from 'shared/ui/Loader/Loader';
import FunnelCardItem from '../../../FunnelCardItem/FunnelCardItem';
import Modal from 'shared/ui/Modal/Modal';
import Icon from 'shared/ui/Icon/Icon';
import FunnelCardAll from '../../ui/FunnelCardAll/FunnelCardAll';

import styles from './FunnelCard.module.scss';
import FullSizeIcon from 'shared/assets/icons/full-screen_icon.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { ICamper } from 'entities/Camper';

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
  const { isLoading } = useCampers();
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
        <div
          className={classNames(styles.card__head, { [styles.pointer]: isAllCardIcon }, [])}
          onClick={handleClick}
        >
          <h3>{title}</h3>
          {isAllCardIcon && <Icon icon={<FullSizeIcon/>} size={IconSize.SIZE_20} className={styles.card__icon}/>}
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={close}>
          <FunnelCardAll users={users} title={title}/>
        </Modal>
      )}
      {isLoading && !slicedUsers.length && <Loader className={'m-centred'} />}
      {!isLoading && (
        <ul className={styles.card__content}>
          {slicedUsers.map(user => (
            <FunnelCardItem key={user.email} user={user}/>
          ))}
        </ul>
      )}
    </div>
  );
});

export default FunnelCard;
