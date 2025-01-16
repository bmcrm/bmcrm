import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import styles from './Search.module.scss';
import SearchIcon from '@shared/assets/icons/search_icon.svg';

type SearchProps = {
	className?: string;
	maxWidth?: CSSProperties['maxWidth'];
	placeholder?: string;
	name?: string;
	value: string;
	onChange: (value: string) => void;
};

const Search = memo((props: SearchProps) => {
	const { className, placeholder, name = 'search', value, maxWidth, onChange } = props;

	return (
		<div className={classNames(styles.search, {}, [className])} style={{ maxWidth }}>
			<input
				className={styles.search__input}
				type={'text'}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<Icon icon={<SearchIcon />} size={IconSize.SIZE_20} className={styles.search__icon} />
		</div>
	);
});

export default Search;