import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import styles from './FunnelCardAll.module.scss';
import { ICamper } from 'entities/Camper';
import FunnelCardItem from 'pages/FunnelPage/ui/FunnelCardItem/FunnelCardItem';

type FunnelCardAllProps = {
  className?: string;
  title?: string;
  users: ICamper[];
};

const FunnelCardAll = memo((props: FunnelCardAllProps) => {
  const {
    className,
    title,
    users,
  } = props;

  return (
    <div className={classNames(styles.card, {}, [className])}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <ul className={styles.card__list}>
        {users.map(user => (
          <FunnelCardItem key={user.email} user={user}/>
        ))}
      </ul>
    </div>
  );
});

export default FunnelCardAll;
