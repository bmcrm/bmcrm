import { memo, useMemo } from 'react';
import { FormikInput } from '@shared/ui/FormikInput';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { userState } from '@entities/User';
import { roleOptions } from '../../lib/generateSelectOptions';
import { inputs } from '../../model/data/DetailsForm.data';
import { CamperRole } from '@entities/Camper';
import styles from './DetailsForm.module.scss';

type DetailsFormBasicsProps = {
	role: CamperRole;
};

const DetailsFormBasics = memo(({ role }: DetailsFormBasicsProps) => {
	const { tokens: { decodedIDToken } } = userState();

	const options = useMemo(
		() => role === CamperRole.TCO
			? roleOptions
			: roleOptions.filter(option => option.value !== CamperRole.TCO),
		[role]
	);

	return (
		<>
			<div className={styles.form__row}>
				{inputs.name.map(({ name, placeholder, label }) => (
					<FormikInput
						key={name}
						name={name}
						placeholder={placeholder}
						label={label}
					/>
				))}
			</div>
			<div className={styles.form__row}>
				{inputs.rest.map(({ name, placeholder, label }) => (
					<FormikInput
						key={name}
						name={name}
						placeholder={placeholder}
						label={label}
					/>
				))}
			</div>
			{decodedIDToken?.role === CamperRole.TCO && (
				<CustomSelect
					name={'role'}
					options={options}
					label={'Role'}
					disabled={role === CamperRole.TCO}
				/>
			)}
		</>
	);
});

export { DetailsFormBasics };