import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';
import { classNames } from 'shared/lib/classNames/classNames';
import Container from 'shared/ui/Container/Container';
import Button from 'shared/ui/Button/Button';
import styles from './CampNotFound.module.scss';

const CampNotFound = memo(() => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    setIsAnimate(true);
  }, []);

  const onRedirectHandler = (target: string) => {
    navigate(target, { replace: true });
  };

  return (
    <section className={styles.notFound}>
      <Container>
        <div className={styles.message}>
          <h1>Such a camp doesn't exist!</h1>
          <p>Want to create it? Click the button below!</p>
          <Button className={`${styles.btn} m-centred`} onClick={() => onRedirectHandler(RoutePath.sign_up)}>
            CREATE A CAMP AND ACCOUNT
          </Button>
        </div>
      </Container>
      <span className={classNames(styles.notFound__tumbleweed, { [styles.animate]: isAnimate }, [])}/>
    </section>
  );
});

export default CampNotFound;
