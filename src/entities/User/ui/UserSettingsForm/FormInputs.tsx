import { memo } from 'react';
import { useFormikContext } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { BMYearsOptions } from '@shared/lib/generateBMYearsOptions';
import { Avatar } from '@shared/ui/Avatar';
import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { DetailsFormHistory, DetailsFormSocials, type CamperHistory, type CamperSocial } from '@entities/Camper';
import { inputsData } from '../../model/data/UserSettingsForm.data';
import styles from './UserSettingsForm.module.scss';

type FormInputsProps = {
	className?: string;
	history?: CamperHistory[];
	socials?: CamperSocial[];
	visitedBM?: string[];
};

const FormInputs = memo((props: FormInputsProps) => {
	const { className, history, socials, visitedBM } = props;
	const { setFieldValue } = useFormikContext();
	const currentYear = new Date().getFullYear();

	return (
		<div className={classNames(styles.form__inner, {}, [className])}>
			<div className={styles.form__inputs}>
				<div className={styles.form__row}>
					{inputsData.name.map(input => <FormikInput key={input.name} {...input} />)}
				</div>
				<div className={styles.form__row}>
					{inputsData.playa.map(input => <FormikInput key={input.name} {...input} />)}
				</div>
				<MultiSelect
					isSearchable
					label={'Visited BM`s'}
					placeholder={'Select or Write...'}
					value={visitedBM || []}
					options={BMYearsOptions(currentYear)}
					onChange={(newValue) => setFieldValue('visitedBM', newValue)}
				/>
			</div>
			<Avatar size={240} src={null} />
			<div className={styles.form__inputs}>
				<FormikTextarea
					name={'about_me'}
					placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
					label={'Summary'}
				/>
				<DetailsFormHistory history={history} />
				<DetailsFormSocials socials={socials} />
			</div>
		</div>
	);
});

export { FormInputs };