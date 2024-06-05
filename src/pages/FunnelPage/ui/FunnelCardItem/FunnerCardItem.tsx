import styles from './FunnerCardItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';
import { UserInformation } from '../FunnelCard/FunnelCard';

export type User = {
  id: string;
  name: string;
  online: boolean;
};

type FunnerCardItemProps = {
  className?: string;
  user: User;
  openDetails: (data: UserInformation) => void;
};

const FunnerCardItem = ({ className, user, openDetails }: FunnerCardItemProps) => {
  return (
    <li className={classNames(styles.cardItem, { [styles.online]: user.online }, [className])}>
      <Avatar alt={user.name} size={30} />
      <p onClick={() => openDetails({ name: user.name })} className={styles.cardItem__name}>
        {user.name}
      </p>
    </li>
  );
};

export default FunnerCardItem;
