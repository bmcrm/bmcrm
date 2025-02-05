import { memo, useCallback, useMemo } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FormLoader } from '@features/FormLoader';
import { CampersModal } from '../CampersModal/CampersModal';
import { FunnelCardItem } from '../FunnelCardItem/FunnelCardItem.tsx';
import { useGetCampers, type ICamper } from '@entities/Camper';
import styles from './FunnelCard.module.scss';
import FullSizeIcon from '@shared/assets/icons/full-screen_icon.svg';

type FunnelCardProps = {
  className?: string;
  title?: string;
  fluid?: boolean;
  maxUsers?: string | number;
  users: ICamper[];
};

const FunnelCard = memo((props: FunnelCardProps) => {
  const { className, title, fluid, users, maxUsers = 5 } = props;
  const { isLoading } = useGetCampers();
  const { isOpen, open, close } = useToggle();
  const slicedUsers = useMemo(() => users.slice(0, +maxUsers), [users, maxUsers]);
  const isModal = useMemo(() => users.length > +maxUsers, [users.length, maxUsers]);
  const isSlicedUsers = slicedUsers.length > 0;

  const mods: Mods = {
    [styles.fluid]: fluid,
    [styles.empty]: !isSlicedUsers,
  };

  const handleClick = useCallback(() => {
    if (isModal) {
      open();
    }
  }, [open, isModal]);

  return (
    <>
      <div className={classNames(styles.card, mods, [className])}>
        {isLoading && <FormLoader />}
        {title && (
          <div className={classNames(styles.card__head, { [styles.pointer]: isModal }, [])} onClick={handleClick}>
            <h3>{title}</h3>
            {isModal && <Icon icon={<FullSizeIcon />} size={IconSize.SIZE_20} className={styles.card__icon} />}
          </div>
        )}
        <ul className={styles.card__content}>
          {isSlicedUsers ? (
            slicedUsers.map(user => <FunnelCardItem key={user.email} user={user} />)
          ) : (
            <li className={styles.card__empty}>Nobody's rocking this status.</li>
          )}
        </ul>
      </div>
      <CampersModal users={users} title={title} isOpen={isOpen} onClose={close} />
    </>
  );
});

export { FunnelCard };
