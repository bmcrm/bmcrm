import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { AddShiftModal } from '@widgets/AddShiftModal';
import { ShiftsList } from '../ShiftsList/ShiftsList';
import { useGetShifts } from '@entities/Shift';
import styles from './ShiftsPage.module.scss';

const ShiftsPage = () => {
  const { isOpen, open, close } = useToggle();
  const { data: shifts, isLoading } = useGetShifts();

  console.log('shifts: ', shifts);

  return (
    <>
      <section className={styles.shifts}>
        <Container fluid>
          <Button className={'ml-a'} onClick={open}>
            Add new
          </Button>
          {isLoading && <Loader />}
          {shifts && <ShiftsList className={'mt-40'} shifts={shifts} />}
        </Container>
      </section>
      <AddShiftModal isOpen={isOpen} onClose={close} />
    </>
  );
};

export default ShiftsPage;
