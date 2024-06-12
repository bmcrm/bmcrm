import { memo } from 'react';
import styles from './FunnerCardItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';
import { ICamper } from 'entities/Camper/model/types/camper.types.ts';

export type User = {
  id: string;
  name: string;
  online: boolean;
};

type FunnerCardItemProps = {
  className?: string;
  user: ICamper | Partial<ICamper>;
  openDetails?: (id: string) => void;
};

const FunnelCardItem = memo(({ className, user, openDetails }: FunnerCardItemProps) => {
  const userName = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email;

  return (
    <li
      onClick={() => openDetails?.(user.email!)}
      className={classNames(styles.cardItem, { [styles.online]: user.email_confirmed }, [className])}
    >
      <Avatar alt={user.avatar} size={30} />
      <p className={styles.cardItem__name}>
        {userName}
      </p>
    </li>
  );
});

export default FunnelCardItem;
