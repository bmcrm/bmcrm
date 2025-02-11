import { memo, useCallback } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Datepicker, DatepickerTime } from '@shared/ui/Datepicker';
import type { IShift } from '../../model/types/Shift.types';
import styles from './ShiftForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type FormDateProps = {
	className?: string;
	values: Partial<IShift>;
};

const FormDate = memo((props: FormDateProps) => {
	const { className, values: { time, start_date, end_date } } = props;
	const { setFieldValue } = useFormikContext();
	const { isMobile } = useMedia();

	const handleDatepickerChange = useCallback(
		(dateRange: [Date | null, Date | null]) => {
			const [start, end] = dateRange;
			void setFieldValue('start_date', start);
			void setFieldValue('end_date', end);
		},
		[setFieldValue]
	);

	return (
		<div className={classNames(styles.form__row, {}, [className])}>
			<Datepicker
				style={{ maxWidth: isMobile ? '100%' : 250 }}
				errorName={'start_date'}
				label={'Date'}
				dateRange={[start_date, end_date]}
				onChange={handleDatepickerChange}
			/>
			<FieldArray name={'time'}>
				{({ push, remove }) => (
					<div className={styles.form__group}>
						<div className={styles.form__caption}>
							<p>Time</p>
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.form__btn}
								onClick={() => push({ start_time: null, end_time: null })}
							>
								<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
							</Button>
						</div>
						{time?.map((t, i) => (
							<div key={i} className={styles.form__fields}>
								<DatepickerTime
									style={{ maxWidth: isMobile ? '100%' : 100 }}
									time={t.start_time}
									name={`time.${i}.start_time`}
									onChange={(date) => setFieldValue(`time.${i}.start_time`, date)}
								/>
								{'-'}
								<DatepickerTime
									style={{ maxWidth: isMobile ? '100%' : 100 }}
									time={t.end_time}
									name={`time.${i}.end_time`}
									onChange={(date) => setFieldValue(`time.${i}.end_time`, date)}
								/>
								{i !== 0 && (
									<Button
										theme={ButtonTheme.CLEAR}
										size={ButtonSize.TEXT}
										className={styles.form__btn}
										onClick={() => remove(i)}
									>
										<Icon icon={<MinusIcon />} size={IconSize.SIZE_10} />
									</Button>
								)}
							</div>
						))}
					</div>
				)}
			</FieldArray>
		</div>
	);
});

export { FormDate };