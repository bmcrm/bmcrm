import styles from './FunnelPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Sidebar from 'widgets/Sidebar';
import Button from 'shared/ui/Button/Button';
import Funnel from '../Funnel/Funnel';
import FunnelCard from '../FunnelCard/FunnelCard';

const FUNNEL_STATIC = {
  leads: {
    funnel: {
      count: '846',
      complete: '80',
    },
    users: [
      {
        id: '1',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '2',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '3',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '4',
        name: 'Noah Johnson',
        online: false,
      },
      {
        id: '5',
        name: 'Jessica Williams',
        online: true,
      },
      {
        id: '6',
        name: 'Emily Johnson',
        online: false,
      },
      {
        id: '7',
        name: 'Christopher Brown',
        online: false,
      },
      {
        id: '8',
        name: 'Ashley Davis',
        online: false,
      },
      {
        id: '9',
        name: 'Matthew Wilson',
        online: false,
      },
      {
        id: '10',
        name: 'Emily Johnson',
        online: false,
      },
      {
        id: '11',
        name: 'Matthew Wilson',
        online: false,
      },
      {
        id: '12',
        name: 'Emily Johnson',
        online: false,
      },
      {
        id: '13',
        name: 'Matthew Wilson',
        online: false,
      },
    ],
  },
  qualified: {
    funnel: {
      count: '124',
      complete: '65',
    },
    users: [
      {
        id: '14',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '15',
        name: 'Noah Johnson',
        online: false,
      },
      {
        id: '16',
        name: 'Jessica Williams',
        online: true,
      },
      {
        id: '17',
        name: 'Christopher Brown',
        online: false,
      },
      {
        id: '18',
        name: 'Ashley Davis',
        online: false,
      },
    ],
  },
  intent: {
    funnel: {
      count: '87',
      complete: '40',
    },
    users: [
      {
        id: '19',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '20',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '21',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '22',
        name: 'Noah Johnson',
        online: false,
      },
    ],
  },
  campers: {
    funnel: {
      count: '21',
      complete: '30',
    },
    users: [
      {
        id: '23',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '24',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '25',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '26',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '27',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '28',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '29',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '30',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '31',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '32',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '33',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '34',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '35',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '36',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '37',
        name: 'Yaroslav Korets',
        online: true,
      },
      {
        id: '38',
        name: 'Alex Roman',
        online: true,
      },
      {
        id: '39',
        name: 'Alexandra Roman',
        online: true,
      },
      {
        id: '40',
        name: 'Yaroslav Korets',
        online: true,
      },
    ],
  },
};

const FunnelPage = memo(() => {
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
          <Button>Invite</Button>
        </div>
        <div className={styles.funnel__content}>
          <FunnelCard title={'Leads'} users={FUNNEL_STATIC.leads.users}/>
          <FunnelCard title={'Qualified'} users={FUNNEL_STATIC.qualified.users}/>
          <FunnelCard title={'Intent'} users={FUNNEL_STATIC.intent.users}/>
          <FunnelCard title={'Campers'} fluid users={FUNNEL_STATIC.campers.users}/>
        </div>
      </section>
    </>
  );
});

export default FunnelPage;
