import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

import Loader from 'shared/ui/Loader/Loader';
import FunnelCardItem from '../../../FunnelCardItem/FunnelCardItem';
import Modal from 'shared/ui/Modal/Modal';
import Icon from 'shared/ui/Icon/Icon';
import { MemberDetails } from '../../../MemberDetails/MemberDetails';
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
  users: ICamper[] | Partial<ICamper>[];
};

const FunnelCard = memo((props: FunnelCardProps) => {
  const { className, title, fluid, users, maxUsers = 9 } = props;
  const [userDetails, setUserDetails] = useState<string>('');
  const { isOpen, toggle } = useToggle();
  const [isAllCard, setIsAllCard] = useState(false);
  const isLoading = useCampers(state => state.isLoading);
  const slicedUsers = users.slice(0, +maxUsers);
  const isAllCardIcon = users.length > +maxUsers;

  const toggleDetails = (id: string) => {
    toggle();
    setUserDetails(id);
  };

  const toggleAllCard = () => {
    if (isAllCardIcon) {
      setIsAllCard(prev => !prev);
    }
  };

  return (
    <div className={classNames(styles.card, { [styles.fluid]: fluid }, [className])}>
      {title && (
        <div className={styles.card__head} onClick={toggleAllCard}>
          <h3>{title}</h3>
          {isAllCardIcon && <Icon icon={<FullSizeIcon/>} size={IconSize.SIZE_20} className={styles.card__icon}/>}
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle}>
          <MemberDetails camperId={userDetails} />
        </Modal>
      )}
      {isAllCard && (
        <Modal isOpen={isAllCard} onClose={toggleAllCard}>
          <FunnelCardAll users={users} title={title}/>
        </Modal>
      )}
      {isLoading && !slicedUsers.length && <Loader className={'m-centred'} />}
      {!isLoading && (
        <ul className={styles.card__content}>
          {slicedUsers.map(user => (
            <FunnelCardItem key={user.email} openDetails={toggleDetails} user={user}/>
          ))}
        </ul>
      )}
    </div>
  );
});

export default FunnelCard;
