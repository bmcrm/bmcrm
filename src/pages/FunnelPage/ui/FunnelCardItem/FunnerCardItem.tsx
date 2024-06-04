import styles from './FunnerCardItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';

export type User = {
  id: string;
  name: string;
  online: boolean;
};

type FunnerCardItemProps = {
  className?: string;
  user: User;
};

const FunnerCardItem = ({ className, user }: FunnerCardItemProps) => {
  return (
    <li className={classNames(styles.cardItem, { [styles.online]: user.online }, [className])}>
      <Avatar alt={user.name} size={30}/>
      <p className={styles.cardItem__name}>{user.name}</p>
    </li>
  );
};

export default FunnerCardItem;
