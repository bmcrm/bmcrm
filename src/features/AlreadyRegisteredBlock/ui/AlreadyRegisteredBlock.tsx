import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import toast from 'react-hot-toast';
import Image from 'shared/ui/Image/Image';
import Icon from 'shared/ui/Icon/Icon';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { type ICamp } from 'entities/Camp';
import styles from './AlreadyRegisteredBlock.module.scss';
import CopyIcon from 'shared/assets/icons/copy_icon.svg';
import DesertImg from 'shared/assets/images/auth/desert.png';

type AlreadyRegisteredBlockProps = {
  camp: ICamp | null;
};

const AlreadyRegisteredBlock = memo(({ camp }: AlreadyRegisteredBlockProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handleCopyClick = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied!', { duration: 2000, position: 'top-right' });
    } catch {
      toast.error('Failed to copy!', { duration: 2000, position: 'top-right' });
    }
  };
  
  return (
    <div className={styles.item}>
      <div className={styles.item__content}>
        <p className={styles.item__caption}>
          You are already a part of the camp
        </p>
        <p>
          If you have questions reach out to the camp TCO  via mail
        </p>
        <div className={styles.tco}>
          {camp?.tco_fullname && (
            <h3 className={styles.tco__name}>
              {camp.tco_fullname}
            </h3>
          )}
          <div className={styles.tco__data} onClick={() => handleCopyClick(camp?.tco as string)}>
            <p>{camp?.tco}</p>
            <Icon icon={<CopyIcon/>} size={IconSize.SIZE_20}/>
          </div>
        </div>
      </div>
      {!isMobile && <Image src={DesertImg} alt={'desert'}/>}
    </div>
  );
});

export default AlreadyRegisteredBlock;
