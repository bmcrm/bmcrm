import { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useToggle } from 'shared/hooks/useToggle/useToggle';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';
import { useMediaQuery } from 'react-responsive';

import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/ui/FunnelCard/FunnelCard';
import Modal from 'shared/ui/Modal/Modal';
import Container from 'shared/ui/Container/Container';
import InviteMember from '../InviteMember/InviteMember';

import styles from './FunnelPage.module.scss';
import { CamperRole, ICamper } from 'entities/Camper';

interface IRoles {
  [CamperRole.TCO]: ICamper | undefined;
  [CamperRole.LEAD]: ICamper[];
  [CamperRole.QUALIFIED]: ICamper[];
  [CamperRole.INTENT]: ICamper[];
  [CamperRole.CAMPER]: ICamper[];
}

const FunnelPage = memo(() => {
  const { toggle, isOpen } = useToggle();
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const { getCampers, campers } = useCampers();
  const [roles, setRoles] = useState<IRoles>({
    [CamperRole.TCO]: undefined,
    [CamperRole.LEAD]: [],
    [CamperRole.QUALIFIED]: [],
    [CamperRole.INTENT]: [],
    [CamperRole.CAMPER]: [],
  });

  useEffect(() => {
    getCampers();
  }, [getCampers]);

  useEffect(() => {
    if (campers.length > 0) {
      const tco = campers.find(camper => camper.role === CamperRole.TCO);
      const lead = campers.filter(camper => camper.role === CamperRole.LEAD);
      const qualified = campers.filter(camper => camper.role === CamperRole.QUALIFIED);
      const intent = campers.filter(camper => camper.role === CamperRole.INTENT);
      const campersRole = campers.filter(camper => camper.role === CamperRole.CAMPER);

      if (tco) {
        campersRole.unshift(tco);
      }

      setRoles({
        tco,
        lead,
        qualified,
        intent,
        camper: campersRole,
      });
    }
  }, [campers]);

  return (
    <section className={classNames(styles.funnel, {}, [])}>
      <Container fluid>
        <div className={styles.funnel__head}>
          <Funnel
            campers={{
              [CamperRole.LEAD]: roles[CamperRole.LEAD].length,
              [CamperRole.QUALIFIED]: roles[CamperRole.QUALIFIED].length,
              [CamperRole.INTENT]: roles[CamperRole.INTENT].length,
              [CamperRole.CAMPER]: roles[CamperRole.CAMPER].length,
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
          <FunnelCard title={'Leads'} users={roles[CamperRole.LEAD]}/>
          <FunnelCard title={'Qualified'} users={roles[CamperRole.QUALIFIED]}/>
          <FunnelCard title={'Intent'} users={roles[CamperRole.INTENT]}/>
          <FunnelCard title={'Campers'} fluid={!isTablet} users={roles[CamperRole.CAMPER]} maxUsers={12}/>
        </div>
      </Container>
    </section>
  );
});

export default FunnelPage;
