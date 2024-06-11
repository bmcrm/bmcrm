import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

import Loader from 'shared/ui/Loader/Loader';
import FunnelCardItem from '../FunnelCardItem/FunnelCardItem';
import Modal from 'shared/ui/Modal/Modal';
import Icon from 'shared/ui/Icon/Icon';
import { MemberDetails } from '../MemberDetails/MemberDetails';

import styles from './FunnelCard.module.scss';
import { ICamper } from 'entities/Camper/model/type';
import FullSizeIcon from 'shared/assets/icons/full-screen_icon.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';

type FunnelCardProps = {
  className?: string;
  title?: string;
  fluid?: boolean;
  users: ICamper[] | Partial<ICamper>[];
};

const FunnelCard = (props: FunnelCardProps) => {
  const { className, title, fluid, users } = props;
  const [userDetails, setUserDetails] = useState<string>('');
  const { isOpen, toggle } = useToggle();
  const [isFullCard, setIsFullCard] = useState(false);
  const isLoading = useCampers(state => state.isLoading);
  const toggleDetails = (id: string) => {
    toggle();
    setUserDetails(id);
  };
  const slicedUsers = fluid ? users.slice(0, 12) : users.slice(0, 9);

  const toggleFullCard = () => {
    setIsFullCard(prev => !prev);
  };

  return (
    <div className={classNames(styles.card, { [styles.fluid]: fluid }, [className])}>
      {title && (
        <div className={styles.card__head} onClick={toggleFullCard}>
          <h3>{title}</h3>
          <Icon icon={<FullSizeIcon/>} size={IconSize.SIZE_20} className={styles.card__icon}/>
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle}>
          <MemberDetails camperId={userDetails} />
        </Modal>
      )}
      {isFullCard && (
        <Modal isOpen={isFullCard} onClose={toggleFullCard}>
          <ul>
            {users.map(user => (
              <FunnelCardItem openDetails={toggleDetails} key={user.id} user={user}/>
            ))}
          </ul>
        </Modal>
      )}
      {isLoading && !slicedUsers.length && <Loader className={'m-centred'} />}
      {!isLoading && (
        <ul className={styles.card__content}>
          {slicedUsers.map(user => (
            <FunnelCardItem openDetails={toggleDetails} key={user.id} user={user}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FunnelCard;
