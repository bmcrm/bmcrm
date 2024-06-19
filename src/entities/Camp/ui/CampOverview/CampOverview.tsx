import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useCamp } from 'entities/Camp';
import { RoutePath } from 'app/providers/AppRouter';

import Skeleton from 'shared/ui/Skeleton/Skeleton';
import Text from 'shared/ui/Text/Text';
import Button from 'shared/ui/Button/Button';
import Image from 'shared/ui/Image/Image';
import Icon from 'shared/ui/Icon/Icon';

import styles from './CampOverview.module.scss';
import { TextAlign, TextSize } from 'shared/ui/Text/Text.types';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import LocationIcon from 'shared/assets/icons/location_icon.svg';
import RedirectIcon from 'shared/assets/icons/arrow-redirect.svg';
import { ICamp } from '../../model/types/camp.types';

type CampOverviewProps = {
  campID?: string;
};

const CampOverview = memo(({ campID }: CampOverviewProps) => {
  const [camp, setCamp] = useState<ICamp>();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const { getCamp, isLoading, isError } = useCamp();
  const navigate = useNavigate();
  let content;
  
  useEffect(() => {
    const fetchCamp = async () => {
      const response = await getCamp(campID as string);

      if (response) {
        setCamp({
          ...response
        });
      }
    };

    fetchCamp();
  }, [getCamp, campID]);

  const onRedirectHandler = (target: string) => {
    navigate(target, { replace: true });
  };

  if (isLoading) {
    content = (
      <>
        <Skeleton width={300} height={42} className={'m-centred'}/>
        <Skeleton width={200} height={26} className={'m-centred mt-10'}/>
        <div className={`${styles.camp__row} mt-30`}>
          <Skeleton width={isMobile ? '100%' : 515} height={400} border={'20px'}/>
          <div className={styles.camp__desc}>
            <Skeleton width={'100%'} height={32}/>
            <Skeleton width={'90%'} height={32}/>
            <Skeleton width={'80%'} height={32}/>
            <Skeleton width={'30%'} height={32}/>
            <Skeleton width={'30%'} height={50} border={'100px'} className={'mt-a'}/>
          </div>
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <>
        <Text
          title={'Such a camp doesn\'t exist!'}
          titleSize={TextSize.XL}
          titleAlign={TextAlign.CENTER}
          description={'Want to create it? Click the button below!'}
          descSize={TextSize.L}
          descAlign={TextAlign.CENTER}
        />
        <Button className={'m-centred mt-30'} onClick={() => onRedirectHandler(RoutePath.sign_up)}>
          REGISTER
        </Button>
      </>
    );
  } else {
    content = (
      <>
        <h1 className={styles.camp__title}>{camp?.camp_name}</h1>
        <h2 className={styles.camp__subtitle}>Campers {camp?.campers_count || '0'}</h2>
        <div className={styles.camp__row}>
          <Image borderRadius={isMobile ? 20 : 30}/>
          <div className={styles.camp__desc}>
            <p className={styles.camp__text}>{camp?.camp_description || 'Someday, there will be a camp description here!'}</p>
            {camp?.city && (
              <address className={styles.camp__address}>
                <Icon icon={<LocationIcon/>} size={isTablet ? IconSize.SIZE_18 : IconSize.SIZE_24}/>
                {camp.city}
              </address>
            )}
            {camp?.camp_website && (
              <Link to={camp.camp_website} className={styles.camp__btn}>
                Camp website
                <Icon icon={<RedirectIcon/>} size={isTablet ? IconSize.SIZE_20 : IconSize.SIZE_28}/>
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
