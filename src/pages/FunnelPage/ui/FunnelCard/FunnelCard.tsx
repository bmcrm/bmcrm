import styles from './FunnelCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import FunnerCardItem, { type User } from '../FunnelCardItem/FunnerCardItem';
import { useToggle } from 'shared/hooks/useToggle';
import Modal from 'shared/ui/Modal/Modal';
import { MemberDetails } from '../MemberDetails/MemberDetails';
import { useState } from 'react';
import { ICamper } from 'entities/Camper/model/type';
import Loader from 'shared/ui/Loader/Loader';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

type FunnelCardProps = {
  className?: string;
  title?: string;
  fluid?: boolean;
  users: ICamper[];
};

export interface UserInformation {
  name: string;
  id: string;
}

const FunnelCard = (props: FunnelCardProps) => {
  const { className, title, fluid, users } = props;
  const [userDetails, setUserDetails] = useState<string>('');
  const { isOpen, toggle } = useToggle();
  const isLoading = useCampers(state => state.isLoading);
  const toggleDetails = (id: string) => {
    toggle();
    setUserDetails(id);
  };
  const slicedUsers = fluid ? users.slice(0, 12) : users.slice(0, 9);

  return (
    <div className={classNames(styles.card, { [styles.fluid]: fluid }, [className])}>
      {title && (
        <div className={styles.card__head}>
          <h3>{title}</h3>
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle}>
          <MemberDetails camperId={userDetails} />
        </Modal>
      )}
      <ul className={styles.card__content}>
        {isLoading && <Loader />}
        {slicedUsers.map(user => (
          <FunnerCardItem openDetails={toggleDetails} key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default FunnelCard;
