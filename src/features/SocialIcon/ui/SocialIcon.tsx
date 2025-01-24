import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Icon, IconSize } from '@shared/ui/Icon';
import { socialIconsList } from '../lib/socialIconsList';
import type { CamperSocial } from '@entities/Camper';
import { SocialIcons } from '../model/types/SocialIcon.types';
import styles from './SocialIcon.module.scss';

type SocialIconProps = {
  className?: string;
  social: CamperSocial;
};

const SocialIcon = memo((props: SocialIconProps) => {
  const { className, social: { name, url } } = props;
  const { isMobile } = useMedia();

  return (
    <a href={url} target={'_blank'} className={classNames(styles.link, {}, [className])}>
      <Icon
        icon={socialIconsList[name as SocialIcons]}
        size={isMobile ? IconSize.SIZE_20 : IconSize.SIZE_24}
      />
    </a>
  );
});

export default SocialIcon;
