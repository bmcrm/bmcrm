import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Search } from '@features/Search';
import { Button } from '@shared/ui/Button';
import styles from './InventoryControl.module.scss';

type InventoryControlProps = {
	className?: string;
	handleOpen: () => void;
	value: string;
	onChange: (value: string) => void;
};

const InventoryControl = memo((props: InventoryControlProps) => {
	const { className, handleOpen, value, onChange } = props;

	return (
		<div className={classNames(styles.control, {}, [className])}>
			<Search
				maxWidth={245}
				placeholder={'Spoon...'}
				value={value}
				onChange={onChange}
			/>
			<Button onClick={handleOpen}>Add inventory</Button>
		</div>
	);
});

export { InventoryControl };