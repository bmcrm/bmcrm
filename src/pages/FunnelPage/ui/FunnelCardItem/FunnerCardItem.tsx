import styles from './FunnerCardItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';
import { ICamper } from 'entities/Camper/model/type';

export type User = {
  id: string;
  name: string;
  online: boolean;
};

type FunnerCardItemProps = {
  className?: string;
  user: ICamper | Partial<ICamper>;
  openDetails: (id: string) => void;
};

const FunnerCardItem = ({ className, user, openDetails }: FunnerCardItemProps) => {
  return (
    <li
      onClick={() => openDetails(user.id!)}
      className={classNames(styles.cardItem, { [styles.online]: user.id }, [className])}
    >
      <Avatar alt={user.avatar} size={30} />
      <p className={styles.cardItem__name}>
        {user.first_name} {user.last_name}
      </p>
    </li>
  );
};

export default FunnerCardItem;
