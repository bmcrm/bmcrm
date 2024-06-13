import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import Avatar from 'shared/ui/Avatar/Avatar';
import Icon from 'shared/ui/Icon/Icon';

import styles from './FunnerCardItem.module.scss';
import { ICamper } from 'entities/Camper/model/types/camper.types';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import ClockIcon from 'shared/assets/icons/clock.svg';
import CheckIcon from 'shared/assets/icons/check.svg';
import { MemberDetails } from 'pages/FunnelPage/ui/MemberDetails/MemberDetails.tsx';
import Modal from 'shared/ui/Modal/Modal.tsx';
import { useToggle } from 'shared/hooks/useToggle/useToggle.tsx';

type FunnerCardItemProps = {
  className?: string;
  user: ICamper;
};

const FunnelCardItem = memo(({ className, user }: FunnerCardItemProps) => {
  const [camperEmail, setCamperEmail] = useState<string | null>(null);
  const userName = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email;
  const { isOpen, open, close } = useToggle();

  const clickHandler = () => {
    setCamperEmail(user.email);
    open();
  };

  return (
    <>
      <li
        onClick={clickHandler}
        className={classNames(styles.cardItem, {}, [className])}
      >
        <Avatar alt={user.avatar} size={30}/>
        <p className={styles.cardItem__name}>{userName}</p>
        <Icon
          className={'ml-a'}
          icon={user.email_confirmed ? <CheckIcon/> : <ClockIcon/>}
          size={IconSize.SIZE_14}
          style={{ color: user.email_confirmed ? '#4ECB71' : '#C1C1C1' }}
        />
      </li>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={close}>
          <MemberDetails camperEmail={camperEmail} />
        </Modal>
      )}
    </>
  );
});

export default FunnelCardItem;
