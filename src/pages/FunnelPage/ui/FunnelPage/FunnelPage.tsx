import { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/ui/FunnelCard/FunnelCard.tsx';
import Modal from 'shared/ui/Modal/Modal';

import styles from './FunnelPage.module.scss';
import { FUNNEL_STATIC } from './data';
import { InviteMember } from '../InviteMember/InviteMember';
import Container from 'shared/ui/Container/Container';
import { useMediaQuery } from 'react-responsive';

const FunnelPage = memo(() => {
  const { toggle, isOpen } = useToggle();
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
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
          <FunnelCard title={'Leads'} users={campers}/>
          <FunnelCard title={'Qualified'} users={campers}/>
          <FunnelCard title={'Intent'} users={campers}/>
          <FunnelCard title={'Campers'} fluid={!isTablet} users={campers} maxUsers={12}/>
        </div>
      </Container>
    </section>
  );
});

export default FunnelPage;
