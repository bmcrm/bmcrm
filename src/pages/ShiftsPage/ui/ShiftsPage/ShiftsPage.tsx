import { useCallback, useState } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { ShiftModal } from '@widgets/ShiftModal';
import { ShiftsList } from '../ShiftsList/ShiftsList';
import { useGetShifts, ShiftFormTheme, type IShift } from '@entities/Shift';
import styles from './ShiftsPage.module.scss';

const ShiftsPage = () => {
  const [currentFormTheme, setCurrentFormTheme] = useState<ShiftFormTheme>(ShiftFormTheme.CREATE);
  const [currentShift, setCurrentShift] = useState<IShift | null>(null);
  const { isOpen, open, close } = useToggle();
  const { data: shifts, isLoading } = useGetShifts();

  const handleCreateShift = useCallback(() => {
    setCurrentFormTheme(ShiftFormTheme.CREATE);
    setCurrentShift(null);
    open();
  }, [open]);

  const handleEditShift = useCallback((shift: IShift) => {
    setCurrentFormTheme(ShiftFormTheme.EDIT);
    setCurrentShift(shift);
    open();
  }, [open]);

  return (
    <>
      <section className={styles.shifts}>
        <Container fluid>
          <Button className={'ml-a'} onClick={handleCreateShift}>Add new</Button>
          {isLoading && <Loader className={styles.loader} />}
          {shifts && <ShiftsList className={'mt-40'} shifts={shifts} onEditShift={handleEditShift} />}
        </Container>
      </section>
      <ShiftModal isOpen={isOpen} onClose={close} theme={currentFormTheme} currentShift={currentShift} />
    </>
  );
};

export default ShiftsPage;
