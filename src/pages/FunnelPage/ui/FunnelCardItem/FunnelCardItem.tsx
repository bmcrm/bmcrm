import { memo, useCallback, useState, type ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Avatar } from '@shared/ui/Avatar';
import { Icon, IconSize } from '@shared/ui/Icon';
import { CamperDetailsModal, CamperDetailsModalTheme } from '@widgets/CamperDetailsModal';
import type { ICamper } from '@entities/Camper';
import styles from './FunnerCardItem.module.scss';
import ClockIcon from '@shared/assets/icons/clock.svg';
import CheckIcon from '@shared/assets/icons/check.svg';
import CreatedCamperIcon from '@shared/assets/icons/admin-created_icon.svg';

type FunnerCardItemProps = {
  className?: string;
  user: ICamper;
};

const FunnelCardItem = memo(({ className, user }: FunnerCardItemProps) => {
  const { email, avatar, email_confirmed, first_name, last_name } = user;
  const [camperEmail, setCamperEmail] = useState<string | null>(null);
  const { isOpen, open, close } = useToggle();
  const userName = first_name && last_name ? `${first_name} ${last_name}` : email;

  const currentStatus = email_confirmed === true
    ? 'true'
    : email_confirmed === false
      ? 'false'
      : 'adminCreated';

  const statusIcons: Record<string, { icon: ReactNode; color?: string }> = {
    true: {
      icon: <CheckIcon />,
      color: '--color-green-light',
    },
    false: {
      icon: <ClockIcon />,
      color: '--color-neutral',
    },
    adminCreated: {
      icon: <CreatedCamperIcon />,
    },
  };

  const handleOpenModal = useCallback(() => {
    setCamperEmail(email);
    open();
  }, [email, open]);

  return (
    <>
      <li onClick={handleOpenModal} className={classNames(styles.cardItem, {}, [className])}>
        <Avatar alt={avatar} size={30} />
        <p className={styles.cardItem__name}>{userName}</p>
        <Icon
          className={'ml-a'}
          icon={statusIcons[currentStatus].icon}
          size={IconSize.SIZE_14}
          style={{ color: `var(${statusIcons[currentStatus].color})` }}
        />
      </li>
      {camperEmail && (
        <CamperDetailsModal
          theme={CamperDetailsModalTheme.DEFAULT}
          camperEmail={camperEmail}
          isOpen={isOpen}
          onClose={close}
        />
      )}
    </>
  );
});

export { FunnelCardItem };
