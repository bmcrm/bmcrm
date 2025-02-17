import { memo } from 'react';
import { FieldArray } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { BMYearsOptions } from '../../lib/generateSelectOptions';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { CamperHistory } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type DetailsFormHistoryProps = {
	history?: CamperHistory[];
};

const DetailsFormHistory = memo(({ history }: DetailsFormHistoryProps) => {
	const currentYear = new Date().getFullYear();

	return (
		<FieldArray name={'history'}>
			{({ push, remove }) => (
				<div className={styles.form__group}>
					<div className={styles.form__caption}>
						<p>History</p>
						<Button
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							className={styles.form__btnControl}
							onClick={() => push({ year: String(currentYear - (history?.length ?? 0)), value: '' })}
							aria-label={'Add history button'}
						>
							<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
						</Button>
					</div>
					<ul className={styles.form__list}>
						{history?.map((h, i) => (
							<li key={i} className={styles.form__listItemHistory}>
								<div className={styles.form__listItemHistoryInner}>
									<CustomSelect name={`history.${i}.year`} options={BMYearsOptions(currentYear)} value={h.year} />
									{i !== 0 && (
										<Button
											theme={ButtonTheme.CLEAR}
											size={ButtonSize.TEXT}
											className={classNames(styles.form__btnControl, {}, ['ml-a', 'mt-5'])}
											onClick={() => remove(i)}
											aria-label={'Remove history button'}
										>
											<Icon icon={<MinusIcon />} size={IconSize.SIZE_16} />
										</Button>
									)}
								</div>
								<FormikTextarea name={`history.${i}.value`} value={h.value} />
							</li>
						))}
					</ul>
				</div>
			)}
		</FieldArray>
	);
});

export { DetailsFormHistory };