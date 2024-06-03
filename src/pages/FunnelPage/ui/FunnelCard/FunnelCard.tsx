import styles from './FunnelCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import FunnerCardItem, { type User } from '../FunnelCardItem/FunnerCardItem';

type FunnelCardProps = {
  className?: string;
  title?: string;
  fluid?: boolean;
  users: User[];
};

const FunnelCard = (props: FunnelCardProps) => {
  const {
    className,
    title,
    fluid,
    users,
  } = props;

  const firstTenUsers = users.slice(0, 10);

  return (
    <div className={classNames(styles.card, { [styles.fluid]: fluid }, [className])}>
      {title && <div className={styles.card__head}><h3>{title}</h3></div>}
      <ul className={styles.card__content}>
        {firstTenUsers.map(user => (
          <FunnerCardItem
            key={user.id}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default FunnelCard;
