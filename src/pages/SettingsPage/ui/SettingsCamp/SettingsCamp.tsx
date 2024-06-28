import { memo } from 'react';
import { CampSettingsForm, type ICamp, useCamp } from 'entities/Camp';
import { useAuth } from 'entities/User';
import ContentWrapper from '../../ui/ContentWrapper/ContentWrapper';
import FormLoader from 'features/FormLoader';

const SettingsCamp = memo(() => {
  const { updateCamp, isLoading } = useCamp();
  const { refreshToken, updateTokens } = useAuth();

  const onSubmitHandler = async (values: Partial<ICamp>) => {
    const { camp_id, ...data } = values;

    const response = await updateCamp(values.camp_id!, data);

    if (response) {
      await updateTokens(refreshToken);
    }
  };

  return (
    <ContentWrapper className={'mt-25'}>
      {isLoading && <FormLoader/>}
      <CampSettingsForm onSubmit={onSubmitHandler}/>
    </ContentWrapper>
  );
});

export default SettingsCamp;
