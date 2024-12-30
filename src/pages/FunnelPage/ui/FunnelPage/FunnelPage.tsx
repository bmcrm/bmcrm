import { useEffect, useState } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { InviteCamperModal } from '@features/InviteCamperModal';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/ui/FunnelCard/FunnelCard';
import { useGetCampers, type ICamper, CamperRole } from '@entities/Camper';
import styles from './FunnelPage.module.scss';

interface IRoles {
  [CamperRole.TCO]: ICamper | undefined;
  [CamperRole.LEAD]: ICamper[];
  [CamperRole.QUALIFIED]: ICamper[];
  [CamperRole.INTENT]: ICamper[];
  [CamperRole.CAMPER]: ICamper[];
  [CamperRole.COORG]: ICamper[];
}

const FunnelPage = () => {
  const { isOpen, open, close } = useToggle();
  const { isTablet } = useMedia();
  const { data: campers, isLoading } = useGetCampers();

  const [roles, setRoles] = useState<IRoles>({
    [CamperRole.TCO]: undefined,
    [CamperRole.LEAD]: [],
    [CamperRole.QUALIFIED]: [],
    [CamperRole.INTENT]: [],
    [CamperRole.CAMPER]: [],
    [CamperRole.COORG]: [],
  });

  useEffect(() => {
    if (campers && campers.length > 0) {
      const tco = campers.find(camper => camper.role === CamperRole.TCO);
      const lead = campers.filter(camper => camper.role === CamperRole.LEAD);
      const qualified = campers.filter(camper => camper.role === CamperRole.QUALIFIED);
      const intent = campers.filter(camper => camper.role === CamperRole.INTENT);
      const campersRole = campers.filter(camper => camper.role === CamperRole.CAMPER);
      const coorg = campers.filter(camper => camper.role === CamperRole.COORG);

      if (tco) {
        campersRole.unshift(tco);
      }

      setRoles({
        tco,
        lead,
        qualified,
        intent,
        camper: campersRole,
        'co-organizer': coorg,
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
          <Button onClick={open} className={styles.funnel__btn}>Invite</Button>
          {isOpen && <InviteCamperModal isOpen={isOpen} onClose={close} />}
        </div>
        <div className={styles.funnel__content}>
          <FunnelCard title={'Leads'} isLoading={isLoading} users={roles[CamperRole.LEAD]} />
          <FunnelCard title={'Qualified'} isLoading={isLoading} users={roles[CamperRole.QUALIFIED]} />
          <FunnelCard title={'Intent'} isLoading={isLoading} users={roles[CamperRole.INTENT]} />
          <FunnelCard
            title={'Campers'}
            fluid={!isTablet}
            users={[...roles[CamperRole.CAMPER], ...roles[CamperRole.COORG]]}
            maxUsers={12}
            isLoading={isLoading}
          />
        </div>
      </Container>
    </section>
  );
};

export default FunnelPage;
