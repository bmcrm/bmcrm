import { useState, useEffect } from 'react';
import { Modal } from '@shared/ui/Modal';
import { Button, ButtonTheme, ButtonColor } from '@shared/ui/Button';
import { CampItemType } from '@entities/Camp/ui/CampLayout/CampLayout'; // Verify path or move type
import styles from './CampDefaultSizesModal.module.scss';
import { ITEM_DIMENSIONS } from '@entities/Camp/ui/CampLayout/Scene/CampItem';

interface CampDefaultSizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDefaults: Record<CampItemType, [number, number, number]>;
  onSave: (newDefaults: Record<CampItemType, [number, number, number]>) => void;
}

export const CampDefaultSizesModal = ({
  isOpen,
  onClose,
  currentDefaults,
  onSave,
}: CampDefaultSizesModalProps) => {
  const [defaults, setDefaults] = useState(currentDefaults);

  useEffect(() => {
    setDefaults(currentDefaults);
  }, [currentDefaults, isOpen]);

  const handleChange = (type: CampItemType, index: 0 | 2, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDefaults((prev) => {
        const newDims = [...prev[type]] as [number, number, number];
        newDims[index] = numValue;
        return { ...prev, [type]: newDims };
      });
    }
  };

  const handleSave = () => {
    onSave(defaults);
    onClose();
  };

  const handleReset = () => {
      setDefaults(ITEM_DIMENSIONS);
  }

  const types = Object.keys(defaults) as CampItemType[];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Default Object Sizes</h2>
        
        <div className={styles.grid}>
            <div className={styles.header}>Object</div>
            <div className={styles.header}>Width (ft)</div>
            <div className={styles.header}>Length (ft)</div>

            {types.map((type) => (
                <div key={type} className={styles.row}>
                    <div className={styles.label}>{type}</div>
                    <div className={styles.inputGroup}>
                        <input
                            type="number"
                            className={styles.input}
                            value={defaults[type][0]}
                            onChange={(e) => handleChange(type, 0, e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="number"
                            className={styles.input}
                            value={defaults[type][2]}
                            onChange={(e) => handleChange(type, 2, e.target.value)}
                        />
                    </div>
                </div>
            ))}
        </div>

        <div className={styles.footer}>
          <Button theme={ButtonTheme.OUTLINE} color={ButtonColor.RUBY} onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div style={{ flex: 1 }}></div>
          <Button theme={ButtonTheme.OUTLINE} color={ButtonColor.RUBY} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
