import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UserSettingsForm } from '@entities/User';
import { FormLoader } from '@features/FormLoader';
import ContentWrapper from '../../ui/ContentWrapper/ContentWrapper';
import { useUpdateCamper, type ICamper } from '@entities/Camper';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './SettingsAccount.module.scss';

const SettingsAccount = memo(() => {
  const { mutate: updateCamper, isPending } = useUpdateCamper();

  const onSubmitHandler = useCallback((values: Partial<ICamper>) => {
    updateCamper(values);
  }, [updateCamper]);

  return (
    <ContentWrapper className={'mt-25'}>
      {isPending && <FormLoader/>}
      <div className={styles.inner}>
        <UserSettingsForm onSubmit={onSubmitHandler}/>
      </div>
      <Link to={RoutePath.reset_pass} className={styles.btnReset}>Reset password</Link>
    </ContentWrapper>
  );
});

export default SettingsAccount;
