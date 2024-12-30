import { memo } from 'react';
import { classNames, type Additional } from '@shared/lib/classNames';
import { TextAlign, TextSize, TextTheme } from '../model/types/Text.types';
import styles from './Text.module.scss';

type TextProps = {
  className?: string;
  title?: string;
  description?: string;
  theme?: TextTheme;
  titleAlign?: TextAlign;
  descAlign?: TextAlign;
  titleSize?: TextSize;
  descSize?: TextSize;
};

const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    description,
    theme = TextTheme.DEFAULT,
    titleAlign = TextAlign.LEFT,
    descAlign = TextAlign.LEFT,
    titleSize = TextSize.L,
    descSize = TextSize.M,
  } = props;

  const titleAds: Additional = [
    styles[titleAlign],
    styles[titleSize],
  ];
  const descAds: Additional = [
    styles[descAlign],
    styles[descSize],
  ];

  return (
    <div className={classNames(styles.text, {}, [className, styles[theme]])}>
      {title && <h2 className={classNames(styles.text__title, {}, titleAds)}>{title}</h2>}
      {description && (
        <h3 className={classNames(styles.text__description, {}, descAds)}>{description}</h3>
      )}
    </div>
  );
});

export default Text;
