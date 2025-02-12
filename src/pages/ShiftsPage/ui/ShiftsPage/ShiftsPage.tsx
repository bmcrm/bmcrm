import { useCallback, useState } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { Container } from '@shared/ui/Container';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { Image } from '@shared/ui/Image';
import { ShiftModal } from '@widgets/ShiftModal';
import { ShiftsList } from '../ShiftsList/ShiftsList';
import { useGetShifts, ShiftFormTheme, type IShift } from '@entities/Shift';
import styles from './ShiftsPage.module.scss';
import EmptyImg from '@shared/assets/images/shifts/not-found.png';

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
        <Container className={styles.shifts__container} fluid>
          <Button className={'ml-a'} onClick={handleCreateShift}>Add new</Button>
          {isLoading && <Loader className={styles.loader} />}
          {shifts && shifts.length > 0 ? (
            <ShiftsList className={'mt-40'} shifts={shifts} onEditShift={handleEditShift} />
          ) : (
            <div className={styles.shifts__empty}>
              <Image src={EmptyImg} maxWidth={400} />
              <h2>No shifts found</h2>
            </div>
          )}
        </Container>
      </section>
      <ShiftModal isOpen={isOpen} onClose={close} theme={currentFormTheme} currentShift={currentShift} />
    </>
  );
};

export default ShiftsPage;
