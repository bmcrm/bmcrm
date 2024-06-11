import { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/FunnelCard';
import Modal from 'shared/ui/Modal/Modal';

import styles from './FunnelPage.module.scss';
import { FUNNEL_STATIC } from './data';
import { InviteMember } from '../InviteMember/InviteMember';
import Container from 'shared/ui/Container/Container';

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
    <section className={classNames(styles.funnel, {}, [])}>
      <Container fluid>
        <div className={styles.funnel__head}>
          <Funnel
            data={{
              leads: FUNNEL_STATIC.leads.funnel,
              qualified: FUNNEL_STATIC.qualified.funnel,
              intent: FUNNEL_STATIC.intent.funnel,
              campers: FUNNEL_STATIC.campers.funnel,
            }}
          />
          <Button onClick={toggle} className={styles.funnel__btn}>Invite</Button>
          {isOpen && (
            <Modal isOpen={isOpen} onClose={toggle}>
              <InviteMember onClose={toggle}/>
            </Modal>
          )}
        </div>
        <div className={styles.funnel__content}>
          <FunnelCard title={'Leads'} users={FUNNEL_STATIC.leads.users}/>
          <FunnelCard title={'Qualified'} users={FUNNEL_STATIC.qualified.users}/>
          <FunnelCard title={'Intent'} users={FUNNEL_STATIC.intent.users}/>
          <FunnelCard title={'Campers'} fluid={window.innerWidth >= 1024} users={FUNNEL_STATIC.campers.users}/>
        </div>
      </Container>
    </section>
  );
});

export default FunnelPage;
