import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Image.module.scss';
import DefaultCampImg from '@shared/assets/images/camp-overview/default-camp.png';

type ImageProps = {
  className?: string;
  src?: string | null;
  alt?: string;
  title?: string;
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  borderRadius?: CSSProperties['borderRadius'];
  customStyles?: CSSProperties;
};

const Image = memo((props: ImageProps) => {
  const { className, src, alt = 'image description', width, maxWidth, borderRadius, customStyles, title } = props;

  const customStyle: CSSProperties = {
    width,
    maxWidth,
    borderRadius,
    ...customStyles,
  };

  return (
    <div className={classNames(styles.image, { [styles.contain]: !src }, [className])} style={customStyle} title={title}>
      <picture>
        <img src={src || DefaultCampImg} alt={alt} />
      </picture>
    </div>
  );
});

export default Image;
