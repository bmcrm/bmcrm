import React, { useRef } from 'react';
import type { CampItemType, PlacedItem } from '../CampLayout';
import styles from './UIOverlay.module.scss';

interface UIOverlayProps {
  availableItems: CampItemType[];
  dragMode: CampItemType | null;
  selectedItem: PlacedItem | null;
  onAddItem: (type: CampItemType) => void;
  onNameChange: (name: string) => void;
  onDimensionChange: (index: 0 | 2, value: string) => void;
  onRotate: () => void;
  onDelete: () => void;
  onSave: () => void;
  onClear: () => void;
  onOpenSettings: () => void;
  hasItems: boolean;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  availableItems,
  dragMode,
  selectedItem,
  onAddItem,
  onNameChange,
  onDimensionChange,
  onRotate,
  onDelete,
  onSave,
  onClear,
  onOpenSettings,
  hasItems
}) => {
  const initialNameRef = useRef<string>("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = React.useState(false);

  React.useEffect(() => {
      if (selectedItem) {
          const isMobile = window.innerWidth <= 768;
          if (!isMobile) {
             setIsInspectorOpen(true);
          } else {
             setIsInspectorOpen(false);
          }
          setIsMenuOpen(false); 
      } else {
          setIsInspectorOpen(false);
      }
  }, [selectedItem?.id]); 

  return (
    <div className={styles.container}>
      
      <button 
        className={styles.mobileToggle} 
        onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsInspectorOpen(false); 
        }}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? '✖' : '📦'}
      </button>

      <div className={`${styles.panel} ${styles.left} ${isMenuOpen ? styles.mobileOpen : ''}`}>
        <h2 className={styles.title}>
            Camp Objects
        </h2>
        <div className={styles.controlsRow}>
            <select 
                className={styles.select}
                value={dragMode || ""} 
                onChange={(e) => {
                    if (e.target.value) onAddItem(e.target.value as CampItemType);
                    else onAddItem(null as any);
                    setIsMenuOpen(false); 
                }}
            >
                <option value="" disabled>Select Object...</option>
                {availableItems.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
        
        {hasItems && (
        <>
            <div className={styles.divider} />

            <button
                onClick={onOpenSettings}
                className={`${styles.button} ${styles.settings}`}
                style={{ fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
                ⚙️ Defaults
            </button>
            
            <button 
                onClick={onSave}
                className={`${styles.button} ${styles.save}`}
            >
                💾 Save
            </button>

            <button 
                onClick={onClear}
                className={`${styles.button} ${styles.clear}`}
            >
                🗑️ Clear
            </button>
        </>
        )}

        {dragMode && (
             <div className={styles.instruction}>
                 Click on grid to place...
             </div>
        )}
      </div>

        {selectedItem && (
             <button 
                className={`${styles.mobileToggle} ${styles.rightToggle}`} 
                onClick={() => {
                    setIsInspectorOpen(!isInspectorOpen);
                    setIsMenuOpen(false);
                }}
                aria-label="Toggle Inspector"
            >
                {isInspectorOpen ? '✖' : '✏️'}
            </button>
        )}

      {/* RIGHT PANEL: Inspector */}
      {selectedItem && (
        <div className={`${styles.panel} ${styles.right} ${isInspectorOpen ? styles.mobileOpen : ''}`}>
            <h2 className={styles.title}>
                Inspector
            </h2>
            
            <div className={styles.inspectorBox}>
                <div style={{ marginBottom: '5px' }}>
                    <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)', marginBottom: '2px' }}>Name</div>
                    <input 
                        type="text" 
                        value={selectedItem.name} 
                        onChange={(e) => onNameChange(e.target.value)}
                        onFocus={() => {
                            initialNameRef.current = selectedItem.name;
                        }}
                        onBlur={(e) => {
                            if (e.target.value.trim() === "") {
                                onNameChange(initialNameRef.current);
                            }
                        }}
                        className={styles.input}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className={styles.inspectorId}>Type: {selectedItem.type}</div>
                <div className={styles.inspectorId}>ID: {selectedItem.id.slice(0,8)}...</div>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Width (ft)
                    <input 
                        type="number" 
                        value={selectedItem.dimensions[0]} 
                        onChange={(e) => onDimensionChange(0, e.target.value)}
                        className={styles.input}
                        min={10}
                    />
                </label>
                <label className={styles.label}>
                    Length (ft)
                    <input 
                        type="number" 
                        value={selectedItem.dimensions[2]} 
                        onChange={(e) => onDimensionChange(2, e.target.value)} 
                        className={styles.input}
                        min={10}
                    />
                </label>
            </div>

            <div className={styles.divider} />

            <div className={styles.actions}>
                <button 
                    onClick={onRotate}
                    className={`${styles.button} ${styles.rotate}`}
                >
                    ↻ Rotate
                </button>
                <button 
                    onClick={onDelete} 
                    className={`${styles.button} ${styles.delete}`}
                >
                    ✖ Delete
                </button>
            </div>
        </div>
      )}
    </div>
  );
};
