import { CSSProperties, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import styles from './Image.module.scss';
import DefaultCampImg from 'shared/assets/images/camp-overview/default-camp.jpg';

type ImageProps = {
  className?: string;
  src?: string | null;
  alt?: string;
  width?: string | number;
  maxWidth?: string | number;
  borderRadius?: string | number;
  customStyles?: CSSProperties;
};

const Image = memo((props: ImageProps) => {
  const {
    className,
    src,
    alt = 'image description',
    width,
    maxWidth,
    borderRadius,
    customStyles,
  } = props;

  const customStyle: CSSProperties = {
    width,
    maxWidth,
    borderRadius,
    ...customStyles,
  };

  return (
    <div className={classNames(styles.image, {}, [className])} style={customStyle}>
      <picture>
        <img src={src || DefaultCampImg} alt={alt}/>
      </picture>
    </div>
  );
});

export default Image;
