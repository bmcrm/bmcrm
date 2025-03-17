import { memo } from 'react';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { getMonth } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { CustomSelect, CustomSelectSize } from '@shared/ui/CustomSelect';
import { months } from '../../model/data/datepicker.data';
import styles from './DatepickerHeader.module.scss';
import ToLeftArrowIcon from '@shared/assets/icons/arrow-to-left_icon.svg';
import ToRightArrowIcon from '@shared/assets/icons/arrow-to-right_icon.svg';

interface DatepickerHeaderProps extends ReactDatePickerCustomHeaderProps {
	className?: string;
}

const DatepickerHeader = memo((props: DatepickerHeaderProps) => {
	const {
		className,
		date,
		changeMonth,
		decreaseMonth,
		increaseMonth,
		prevMonthButtonDisabled,
		nextMonthButtonDisabled
	} = props;

	const selectOptions = months.map(option => ({
		value: option,
		label: option,
	}));

	return (
		<div className={classNames(styles.header, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				className={styles.header__btn}
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
			>
				<Icon icon={<ToLeftArrowIcon />} size={IconSize.SIZE_20} />
			</Button>
			<CustomSelect
				fieldSize={CustomSelectSize.S}
				value={months[getMonth(date)]}
				options={selectOptions}
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
			/>
			<Button
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				className={styles.header__btn}
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
			>
				<Icon icon={<ToRightArrowIcon />} size={IconSize.SIZE_20} />
			</Button>
		</div>
	);
});

export { DatepickerHeader };