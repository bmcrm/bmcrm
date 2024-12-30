import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import styles from './NotFound.module.scss';

type NotFoundProps = {
  redirectTo: string;
  textRedirect: string;
  children?: ReactNode;
};

const NotFound = ({ redirectTo, textRedirect, children }: NotFoundProps) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    setIsAnimate(true);
  }, []);

  const onRedirectHandler = useCallback((target: string) => {
    navigate(target, { replace: true });
  }, [navigate]);

  return (
    <section className={styles.notFound}>
      <Container>
        <div className={styles.message}>
          {children}
          <Button className={`${styles.btn} m-centred`} onClick={() => onRedirectHandler(redirectTo)}>
            {textRedirect}
          </Button>
        </div>
      </Container>
      <span className={classNames(styles.notFound__tumbleweed, { [styles.animate]: isAnimate }, [])} />
    </section>
  );
};

export default NotFound;
