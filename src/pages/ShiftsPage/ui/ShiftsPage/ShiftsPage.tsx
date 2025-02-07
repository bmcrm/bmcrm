import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { AddShiftModal } from '@widgets/AddShiftModal';
import styles from './ShiftsPage.module.scss';

const ShiftsPage = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <section className={styles.shifts}>
        <Container fluid>
          <Button className={'ml-a'} onClick={open}>
            Add new
          </Button>
        </Container>
      </section>
      <AddShiftModal isOpen={isOpen} onClose={close} />
    </>
  );
};

export default ShiftsPage;
