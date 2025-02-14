import { memo, useCallback, type RefObject } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { Skeleton } from '@shared/ui/Skeleton';
import { Image } from '@shared/ui/Image';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { CampersCountModal } from '@features/CampersCountModal';
import { userState } from '@entities/User';
import { useGetCampers } from '@entities/Camper';
import { MODAL_ANIMATION_DELAY } from '@shared/const/animations';
import type { ICamp } from '@entities/Camp';
import styles from './CampOverview.module.scss';
import LocationIcon from '@shared/assets/icons/location_icon.svg';
import RedirectIcon from '@shared/assets/icons/arrow-redirect.svg';
import CampIcon from '@shared/assets/icons/camp_icon.svg';
import BlurIcon from '@shared/assets/icons/blur_icon.svg';

type CampOverviewProps = {
  camp: ICamp | null;
  isLoading: boolean;
  scrollTarget: RefObject<HTMLDivElement>;
};

const CampOverview = memo(({ camp, isLoading, scrollTarget }: CampOverviewProps) => {
  const { isMobile, isTablet } = useMedia();
  const { isOpen, open, close } = useToggle();
  const { isLoggedIn, tokens: { decodedIDToken } } = userState();
  const { data: campers } = useGetCampers({ enabled: isLoggedIn });

  let content = (
    <>
      <Skeleton width={300} height={42} className={'m-centred'} />
      <Skeleton width={200} height={26} className={'m-centred mt-10'} />
      <div className={`${styles.camp__row} mt-30`}>
        <Skeleton width={isMobile ? '100%' : 515} height={400} border={'20px'} />
        <div className={styles.camp__desc}>
          <Skeleton width={'100%'} height={32} />
          <Skeleton width={'90%'} height={32} />
          <Skeleton width={'80%'} height={32} />
          <Skeleton width={'30%'} height={32} />
          <Skeleton width={'30%'} height={50} border={'100px'} className={'mt-a'} />
        </div>
      </div>
    </>
  );

  const scroll = useCallback(() => {
    setTimeout(() => {
      scrollTarget.current?.scrollIntoView({ behavior: 'smooth' });
    }, MODAL_ANIMATION_DELAY);
  }, [scrollTarget.current]);

  const handleCloseWithScroll = useCallback(() => {
    close();
    scroll();
  }, [close, scroll]);

  const campersCounter = isLoggedIn && camp?.camp_id === decodedIDToken?.camp_id ? (
    campers?.length || '0'
  ) : (
    <>
      <Button theme={ButtonTheme.CLEAR} size={ButtonSize.TEXT} onClick={open}>
        <Icon icon={<BlurIcon />} size={IconSize.SIZE_24} />
      </Button>
      <CampersCountModal isOpen={isOpen} onClose={close} onScroll={handleCloseWithScroll} />
    </>
  );

  if (!isLoading) {
    content = (
      <>
        <h1 className={styles.camp__title}>{camp?.camp_name || 'Camp Name will be here'}</h1>
        <div className={styles.camp__info}>
          <h2 className={styles.camp__subtitle}>Campers: {campersCounter}</h2>
          {camp?.camp_website && (
            <a
              href={camp.camp_website.startsWith('http') ? camp.camp_website : `https://${camp.camp_website}`}
              target={'_blank'}
              rel={'noopener noreferrer'}
              className={styles.camp__link}
            >
              Website
              <Icon
                icon={<RedirectIcon />}
                size={isTablet ? IconSize.SIZE_20 : IconSize.SIZE_28}
                style={{ color: 'var(--color-neutral)' }}
              />
            </a>
          )}
        </div>
        <div className={styles.camp__row}>
          <Image className={'m-centred'} borderRadius={isMobile ? 20 : 30} maxWidth={isMobile ? 400 : '100%'} />
          <div className={styles.camp__desc}>
            <p className={styles.camp__text}>
              {camp?.camp_description || 'Someday, there will be a camp description here!'}
            </p>
            {camp?.city && (
              <address className={styles.camp__address}>
                <Icon icon={<LocationIcon />} size={isTablet ? IconSize.SIZE_18 : IconSize.SIZE_24} />
                {camp.city}
              </address>
            )}
            {!isLoggedIn && (
              <Button onClick={scroll} className={styles.camp__btn}>
                Join the Camp
                <Icon icon={<CampIcon />} size={isTablet ? IconSize.SIZE_20 : IconSize.SIZE_20} />
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }

  return content;
});

export default CampOverview;
