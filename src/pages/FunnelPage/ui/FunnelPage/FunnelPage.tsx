import styles from './FunnelPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Sidebar from 'widgets/Sidebar';
import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/FunnelCard';
import Modal from 'shared/ui/Modal/Modal';
import { FUNNEL_STATIC } from './data';
import { InviteMember } from '../InviteMember/InviteMember';
import { useToggle } from 'shared/hooks/useToggle';

const FunnelPage = memo(() => {
  const { toggle, isOpen } = useToggle();

  return (
    <>
      <Sidebar title={'Funnel Page Sidebar'} />
      <section className={classNames(styles.funnel, {}, [])}>
        <div className={styles.funnel__head}>
          <Funnel
            data={{
              leads: FUNNEL_STATIC.leads.funnel,
              qualified: FUNNEL_STATIC.qualified.funnel,
              intent: FUNNEL_STATIC.intent.funnel,
              campers: FUNNEL_STATIC.campers.funnel,
            }}
          />
          <Button onClick={toggle}>Invite</Button>
          {isOpen && (
            <Modal isOpen={isOpen} onClose={toggle}>
              <InviteMember onClose={toggle} />
            </Modal>
          )}
        </div>
        <div className={styles.funnel__content}>
          <FunnelCard title={'Leads'} users={FUNNEL_STATIC.leads.users} />
          <FunnelCard title={'Qualified'} users={FUNNEL_STATIC.qualified.users} />
          <FunnelCard title={'Intent'} users={FUNNEL_STATIC.intent.users} />
          <FunnelCard title={'Campers'} fluid={window.innerWidth >= 1024} users={FUNNEL_STATIC.campers.users} />
        </div>
      </section>
    </>
  );
});

export default FunnelPage;
