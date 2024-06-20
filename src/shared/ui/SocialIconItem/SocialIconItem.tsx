import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { classNames } from 'shared/lib/classNames/classNames';

import Icon from 'shared/ui/Icon/Icon';
import { Link } from 'react-router-dom';
import Button from 'shared/ui/Button/Button';

import styles from './SocialIconItem.module.scss';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { CamperSocial } from 'entities/Camper';
import { SocialIcons, SocialIconsEnum } from './SocialIconItem.types';
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import MinusIcon from 'icons/minus_icon.svg';

type SocialIconItemProps = {
  social: CamperSocial;
  readonly: boolean;
  onRemove: () => void;
};

const SocialIconItem = memo(({ social, readonly, onRemove }: SocialIconItemProps) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  
  return (
    <li className={styles.item}>
      <Link
        to={social.url}
        target={'_blank'}
        className={classNames(styles.link, { [styles.disabled]: !readonly }, [])}
      >
        <Icon icon={SocialIcons[social.name as SocialIconsEnum]} size={isTablet ? IconSize.SIZE_14 : IconSize.SIZE_24}/>
      </Link>
      {!readonly && (
        <Button
          theme={ButtonTheme.CLEAR}
          size={ButtonSize.TEXT}
          className={styles.btnRemove}
          onClick={onRemove}
        >
          <Icon icon={<MinusIcon />} size={IconSize.SIZE_12} />
        </Button>
      )}
    </li>
  );
});

export default SocialIconItem;
