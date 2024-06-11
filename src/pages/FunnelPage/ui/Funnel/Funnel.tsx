import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { classNames } from 'shared/lib/classNames/classNames';

import Progress from 'shared/ui/Progress/Progress';

import { ProgressColors } from 'shared/ui/Progress/Progress.types';
import styles from './Funnel.module.scss';

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
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tooltipRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (openIndex !== null) {
      const tooltip = tooltipRefs.current[openIndex];
      if (tooltip && !tooltip.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    }
  }, [openIndex]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const stages = [
    {
      stage: data.leads,
      color: ProgressColors.ORANGE_LIGHT,
      description:
        'Potential campers who have expressed interest in participating but have not yet confirmed their participation',
    },
    {
      stage: data.qualified,
      color: ProgressColors.ORANGE_DARK,
      description:
        'People who have already registered or have shown a specific level of interest',
    },
    {
      stage: data.intent,
      color: ProgressColors.RUBY_LIGHT,
      description:
        'Participants who confirmed their intention to participate in the camp and showed a high level of interest',
    },
    {
      stage: data.campers,
      color: ProgressColors.RUBY_DARK,
      description:
        'Participants confirmed their intention to participate in the camp and showed a high level of interest',
    },
  ];

  return (
    <ul className={classNames(styles.funnel, {}, [className])}>
      {stages.map((item, index) => (
        <li
          key={index}
          className={styles.funnel__item}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(index);
          }}
        >
          <Progress
            count={item.stage.count}
            color={item.color}
            barWidth={`${item.stage.complete}%`}
            symbol={isTablet}
          />
          <div
            ref={el => tooltipRefs.current[index] = el}
            className={classNames(styles.funnel__tooltip, { [styles.show]: openIndex === index }, [])}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.text}>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
});

export default Funnel;
