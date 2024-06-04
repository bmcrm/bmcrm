import styles from './FunnelPage.module.scss';
import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Sidebar from 'widgets/Sidebar';
import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/FunnelCard';
import Modal from 'shared/ui/Modal/Modal';
import { FUNNEL_STATIC } from './data';

const FunnelPage = memo(() => {
  const [isInviteModal, setIsInviteModal] = useState(false);

  const onToggleInviteModal = useCallback(() => {
    setIsInviteModal(prev => !prev);
  }, []);

  return (
    <>
      <Sidebar title={'Funnel Page Sidebar'}/>
      <section className={classNames(styles.funnel, {}, [])}>
        <div className={styles.funnel__head}>
          <Funnel data={{
            leads: FUNNEL_STATIC.leads.funnel,
            qualified: FUNNEL_STATIC.qualified.funnel,
            intent: FUNNEL_STATIC.intent.funnel,
            campers: FUNNEL_STATIC.campers.funnel,
          }}/>
          <Button onClick={onToggleInviteModal}>Invite</Button>
          {isInviteModal && (
            <Modal isOpen={isInviteModal} onClose={onToggleInviteModal}>
              <p>Share the link to invite a member</p>
            </Modal>
          )}
        </div>
        <div className={styles.funnel__content}>
          <FunnelCard title={'Leads'} users={FUNNEL_STATIC.leads.users}/>
          <FunnelCard title={'Qualified'} users={FUNNEL_STATIC.qualified.users}/>
          <FunnelCard title={'Intent'} users={FUNNEL_STATIC.intent.users}/>
          <FunnelCard title={'Campers'} fluid={window.innerWidth >= 1024} users={FUNNEL_STATIC.campers.users}/>
        </div>
      </section>
    </>
  );
});

export default FunnelPage;
