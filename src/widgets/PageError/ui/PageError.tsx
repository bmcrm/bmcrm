import { memo, useCallback } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Button } from '@shared/ui/Button';
import styles from './PageError.module.scss';

type PageErrorProps = {
  className?: string;
};

const PageError = memo(({ className }: PageErrorProps) => {
  const onReload = useCallback(() => {
    location.reload();
  }, []);

  return (
    <div className={classNames(styles.pageError, {}, [className])}>
      <h1>An error has occurred!</h1>
      <Button onClick={onReload}>Refresh the page</Button>
    </div>
  );
});

export default PageError;
