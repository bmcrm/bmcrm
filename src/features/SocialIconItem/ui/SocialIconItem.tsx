import { memo } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { CamperSocial } from '@entities/Camper';
import { SocialIcons, SocialIconsEnum } from '../model/types/SocialIconItem.types';
import styles from './SocialIconItem.module.scss';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type SocialIconItemProps = {
  social: CamperSocial;
  readonly: boolean;
  onRemove: () => void;
};

const SocialIconItem = memo(({ social, readonly, onRemove }: SocialIconItemProps) => {
  const { isTablet } = useMedia();

  return (
    <li className={styles.item}>
      <Link to={social.url} target={'_blank'} className={classNames(styles.link, { [styles.disabled]: !readonly }, [])}>
        <Icon
          icon={SocialIcons[social.name as SocialIconsEnum]}
          size={isTablet ? IconSize.SIZE_14 : IconSize.SIZE_24}
        />
      </Link>
      {!readonly && (
        <Button theme={ButtonTheme.CLEAR} size={ButtonSize.TEXT} className={styles.btnRemove} onClick={onRemove}>
          <Icon icon={<MinusIcon />} size={IconSize.SIZE_12} />
        </Button>
      )}
    </li>
  );
});

export default SocialIconItem;
