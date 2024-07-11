import { memo, useEffect } from 'react';
import { CampSettingsForm, type ICamp, useCamp } from 'entities/Camp';
import { useAuth } from 'entities/User';
import ContentWrapper from '../../ui/ContentWrapper/ContentWrapper';
import FormLoader from 'features/FormLoader';
import errorHandler from 'shared/lib/errorHandler/errorHandler.ts';
import { AxiosError } from 'axios';

const SettingsCamp = memo(() => {
  const { updateCamp, isLoading, isError, resetError } = useCamp();
  const { refreshToken, updateTokens } = useAuth();

  useEffect(() => {
    if (isError) {
      errorHandler(isError as AxiosError, 'SettingsCamp');
    }

    return resetError();
  }, [isError, resetError]);

  const onSubmitHandler = async (values: Partial<ICamp>) => {
    const { camp_id, ...data } = values;

    const response = await updateCamp(values.camp_id!, data);

    if (response) {
      await updateTokens(refreshToken);
    }
  };

  return (
    <ContentWrapper className={'mt-25'}>
      {isLoading && <FormLoader />}
      <CampSettingsForm onSubmit={onSubmitHandler} />
    </ContentWrapper>
  );
});

export default SettingsCamp;
