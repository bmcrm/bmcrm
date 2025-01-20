import { type CSSProperties, memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { SearchTheme } from '../model/types/Search.types';
import styles from './Search.module.scss';
import SearchIcon from '@shared/assets/icons/search_icon.svg';

type SearchProps = {
	className?: string;
	theme?: SearchTheme;
	maxWidth?: CSSProperties['maxWidth'];
	placeholder?: string;
	name?: string;
	value: string;
	onChange: (value: string) => void;
};

const Search = memo((props: SearchProps) => {
	const { className, theme = SearchTheme.DEFAULT, placeholder, name = 'search', value, maxWidth, onChange } = props;

	return (
		<div className={classNames(styles.search, {}, [className, styles[theme]])} style={{ maxWidth }}>
			<input
				className={styles.search__input}
				type={'text'}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{theme !== SearchTheme.TABLE && (
				<Icon icon={<SearchIcon />} size={IconSize.SIZE_20} className={styles.search__icon} />
			)}
		</div>
	);
});

export default Search;