import { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';

import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/ui/FunnelCard/FunnelCard';
import Modal from 'shared/ui/Modal/Modal';

import styles from './FunnelPage.module.scss';
import { FUNNEL_STATIC } from './data';
import { InviteMember } from '../InviteMember/InviteMember';
import Container from 'shared/ui/Container/Container';
import { useMediaQuery } from 'react-responsive';
import { CamperRole, ICamper } from 'entities/Camper';

interface IRoles {
  tco: ICamper | undefined;
  leads: ICamper[];
  qualified: ICamper[];
  intent: ICamper[];
  campers: ICamper[];
}

const FunnelPage = memo(() => {
  const { toggle, isOpen } = useToggle();
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const { getCampers, campers } = useCampers();
  const [roles, setRoles] = useState<IRoles>({
    tco: undefined,
    leads: [],
    qualified: [],
    intent: [],
    campers: [],
  });

  useEffect(() => {
    getCampers();
  }, [getCampers]);

  useEffect(() => {
    if (campers.length > 0) {
      const tco = campers.find(camper => camper.role === CamperRole.TCO);
      const leads = campers.filter(camper => camper.role === CamperRole.LEAD);
      const qualified = campers.filter(camper => camper.role === CamperRole.QUALIFIED);
      const intent = campers.filter(camper => camper.role === CamperRole.INTENT);
      const campersRole = campers.filter(camper => camper.role === CamperRole.CAMPER);

      if (tco) {
        campersRole.unshift(tco);
      }

      setRoles({
        tco,
        leads,
        qualified,
        intent,
        campers: campersRole,
      });
    }
  }, [campers]);

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
          <FunnelCard title={'Leads'} users={roles.leads}/>
          <FunnelCard title={'Qualified'} users={roles.qualified}/>
          <FunnelCard title={'Intent'} users={roles.intent}/>
          <FunnelCard title={'Campers'} fluid={!isTablet} users={roles.campers} maxUsers={12}/>
        </div>
      </Container>
    </section>
  );
});

export default FunnelPage;
