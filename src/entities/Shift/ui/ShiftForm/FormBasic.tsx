import { memo, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { tagsOptions } from '../../lib/generateSelectOptions';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { useGetCampers } from '@entities/Camper';
import { inputComponents, inputs } from '../../model/data/Shift.data';

type FormBasicProps = {
	members: string[],
};

const FormBasic = memo(({ members }: FormBasicProps) => {
	const { setFieldValue } = useFormikContext();
	const { data: campers } = useGetCampers();

	const tagOptions = useMemo(() => tagsOptions(campers), [campers]);

	return (
		<>
			{inputs.caption.map(({ type, ...rest }) => {
				const Component = inputComponents[type];
				return Component ? <Component key={rest.name} {...rest} /> : null;
			})}
			<MultiSelect
				aria-label={'Members select'}
				label={'Members'}
				placeholder={'Select...'}
				name={'members'}
				value={members || []}
				options={tagOptions}
				onChange={(newDetails) => setFieldValue('members', newDetails)}
			/>
		</>
	);
});

export { FormBasic };