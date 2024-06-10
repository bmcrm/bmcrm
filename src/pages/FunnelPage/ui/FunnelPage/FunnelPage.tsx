import styles from './FunnelPage.module.scss';
import { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Sidebar from 'widgets/Sidebar';
import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/FunnelCard';
import Modal from 'shared/ui/Modal/Modal';
import { FUNNEL_STATIC } from './data';
import { InviteMember } from '../InviteMember/InviteMember';
import { useToggle } from 'shared/hooks/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

const FunnelPage = memo(() => {
  const { toggle, isOpen } = useToggle();
  const { getCampers, campers } = useCampers(state => ({
    getCampers: state.getCampers,
    campers: state.campers,
  }));

  useEffect(() => {
    getCampers();
  }, [getCampers]);

  return (
    <>
      <Sidebar title={'Funnel Page Sidebar'} datalist={['Leads', 'Qualified', 'Intent', 'Campers']} />
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
          <FunnelCard title={'Leads'} users={campers} />
          <FunnelCard title={'Qualified'} users={campers} />
          <FunnelCard title={'Intent'} users={campers} />
          <FunnelCard title={'Campers'} fluid={window.innerWidth >= 1024} users={campers} />
        </div>
      </section>
    </>
  );
});

export default FunnelPage;
