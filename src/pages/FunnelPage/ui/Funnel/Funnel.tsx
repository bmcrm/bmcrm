import styles from './Funnel.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Progress from 'shared/ui/Progress/Progress';
import { ProgressColors } from 'shared/ui/Progress/ProgressTypes';

type FunnelStage = {
  count: string;
  complete: string;
};

type FunnelProps = {
  className?: string;
  data: {
    leads: FunnelStage;
    qualified: FunnelStage;
    intent: FunnelStage;
    campers: FunnelStage;
  };
};

const Funnel = memo(({ className, data }: FunnelProps) => {
  return (
    <ul className={classNames(styles.funnel, {}, [className])}>
      <li className={styles.funnel__item}>
        <Progress count={data.leads.count} color={ProgressColors.ORANGE_LIGHT} barWidth={`${data.leads.complete}%`}/>
        <p className={styles.text}>
          Potential campers who have expressed interest in participating but have not yet confirmed their
          participation
        </p>
      </li>
      <li className={styles.funnel__item}>
        <Progress count={data.qualified.count} color={ProgressColors.ORANGE_DARK} barWidth={`${data.qualified.complete}%`}/>
        <p className={styles.text}>People who have already registered or have shown a specific level of interest</p>
      </li>
      <li className={styles.funnel__item}>
        <Progress count={data.intent.count} color={ProgressColors.RUBY_LIGHT} barWidth={`${data.intent.complete}%`}/>
        <p className={styles.text}>Participants who confirmed their intention to participate in the camp and showed a high level of interest</p>
      </li>
      <li className={styles.funnel__item}>
        <Progress count={data.campers.count} color={ProgressColors.RUBY_DARK} barWidth={`${data.campers.complete}%`}/>
        <p className={styles.text}>Participants confirmed their intention to participate in the camp and showed a high level of interest</p>
      </li>
    </ul>
  );
});

export default Funnel;
