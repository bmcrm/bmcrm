import { memo } from 'react';
import { useAuth, UserSettingsForm } from 'entities/User';
import { type ICamper, useCampers } from 'entities/Camper';
import ContentWrapper from '../../ui/ContentWrapper/ContentWrapper';
import FormLoader from 'features/FormLoader';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';
import styles from './SettingsAccount.module.scss';

const SettingsAccount = memo(() => {
  const { updateCamper, isLoading } = useCampers();
  const { refreshToken, updateTokens } = useAuth();

  const onSubmitHandler = async (values: Partial<ICamper>) => {
    const { email, ...data } = values;

    const response = await updateCamper(values.email!, data);

    if (response) {
      await updateTokens(refreshToken);
    }
  };

  return (
    <ContentWrapper className={'mt-25'}>
      {isLoading && <FormLoader/>}
      <div className={styles.inner}>
        <UserSettingsForm onSubmit={onSubmitHandler}/>
      </div>
      <Link to={RoutePath.reset_pass} className={styles.btnReset}>Reset password</Link>
    </ContentWrapper>
  );
});

export default SettingsAccount;
