import { memo, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from 'entities/User';
import { useCampers } from 'entities/Camper';
import { useToggle } from 'shared/hooks/useToggle/useToggle';

import Skeleton from 'shared/ui/Skeleton/Skeleton';
import Image from 'shared/ui/Image/Image';
import Icon from 'shared/ui/Icon/Icon';
import Button from 'shared/ui/Button/Button';
import CampersCountModal from 'features/CampersCountModal';

import styles from './CampOverview.module.scss';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { type ICamp } from '../../model/types/camp.types';
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import LocationIcon from 'shared/assets/icons/location_icon.svg';
import RedirectIcon from 'shared/assets/icons/arrow-redirect.svg';
import BlurIcon from 'shared/assets/icons/blur_icon.svg';
import { ANIMATION_DELAY } from 'shared/const/global/global';

type CampOverviewProps = {
  camp: ICamp | null;
  isLoading: boolean;
  scrollTarget: RefObject<HTMLDivElement>;
};

const CampOverview = memo(({ camp, isLoading = true, scrollTarget }: CampOverviewProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const { isLoggedIn } = useAuth();
  const { campersCount } = useCampers();
  const { isOpen, open, close } = useToggle();
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

  const closeModalHandler = () => {
    close();

    setTimeout(() => {
      scrollTarget.current?.scrollIntoView({ behavior: 'smooth' });
    }, ANIMATION_DELAY);
  };

  const campersCounter = isLoggedIn ? (
    campersCount || '0'
  ) : (
    <>
      <Button theme={ButtonTheme.CLEAR} size={ButtonSize.TEXT} onClick={open}>
        <Icon icon={<BlurIcon />} size={IconSize.SIZE_24} />
      </Button>
      {isOpen && <CampersCountModal isOpen={isOpen} onClose={closeModalHandler} />}
    </>
  );

  if (!isLoading) {
    content = (
      <>
        <h1 className={styles.camp__title}>{camp?.camp_name || 'Camp Name will be here'}</h1>
        <h2 className={styles.camp__subtitle}>Campers {campersCounter}</h2>
        <div className={styles.camp__row}>
          <Image borderRadius={isMobile ? 20 : 30} />
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
              <div className={styles.camp__btn__signup}>
                <Button onClick={closeModalHandler} fluid>
                  <div className='wave'></div>
                  SIGN UP
                </Button>
              </div>
            )}
            {camp?.camp_website && (
              <Link to={camp.camp_website} className={styles.camp__btn}>
                Camp website
                <Icon icon={<RedirectIcon />} size={isTablet ? IconSize.SIZE_20 : IconSize.SIZE_28} />
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }

  return content;
});

export default CampOverview;
