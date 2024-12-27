import { memo, useCallback } from 'react';
import { CampSettingsForm, useUpdateCamp, type ICamp } from '@entities/Camp';
import ContentWrapper from '../../ui/ContentWrapper/ContentWrapper';
import { FormLoader } from '@features/FormLoader';

const SettingsCamp = memo(() => {
	const { mutate: updateCamp, isPending } = useUpdateCamp();

	const handleSubmit = useCallback(
		(values: Partial<ICamp>) => {
			updateCamp(values);
		},
		[updateCamp]);

	return (
		<ContentWrapper className={'mt-25'}>
			{isPending && <FormLoader/>}
			<CampSettingsForm onSubmit={handleSubmit} />
		</ContentWrapper>
	);
});

export default SettingsCamp;
