import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './CampOverviewPage.module.scss';

type CampOverviewPageProps = {
  className?: string;
};

const CampOverviewPage = memo(({ className }: CampOverviewPageProps) => {
  return (
    <section className={classNames(styles.overview, {}, [className])}>

    </section>
  );
});

export default CampOverviewPage;
