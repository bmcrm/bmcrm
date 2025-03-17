import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { TruncatedTextTooltip } from '../TruncatedTextTooltip/TruncatedTextTooltip';
import styles from './TruncatedText.module.scss';

type TruncatedTextProps = {
	className?: string;
	text: string;
	maxLength?: number;
	url?: string;
	nowrap?: boolean;
};

const TruncatedText = memo((props: TruncatedTextProps) => {
	const { className, text, maxLength = 20, url, nowrap } = props;

	if (!text) return null;

	const shouldTruncate = text.length > maxLength;
	const truncatedText = shouldTruncate ? `${text.slice(0, maxLength)}...` : text;

	return (
		<div className={classNames(styles.trunc, { [styles.nowrap]: nowrap }, [className])}>
			{url? (
        <a href={url} className={styles.trunc__link}>{truncatedText}</a>
      ) : (
        <p>{truncatedText}</p>
      )}
			{shouldTruncate && <TruncatedTextTooltip text={text} className={styles.trunc__tooltip} />}
		</div>
	);
});

export default TruncatedText;