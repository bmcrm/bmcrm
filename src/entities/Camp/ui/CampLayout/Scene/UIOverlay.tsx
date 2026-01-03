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
  hasItems
}) => {
  // Store the name at the start of editing to restore it if user clears and blurs
  const initialNameRef = useRef<string>("");

  return (
    <div className={styles.container}>
      
      {/* LEFT PANEL: Selection */}
      <div className={`${styles.panel} ${styles.left}`}>
        <h2 className={styles.title}>
            Camp Objects
        </h2>
        <div className={styles.buttonGroup}>
            {availableItems.map((type) => (
            <button
                key={type}
                onClick={() => onAddItem(type)}
                className={`${styles.button} ${dragMode === type ? styles.active : ''}`}
            >
                {type}
                <span className={styles.icon}>
                    {type === "RV" ? "🚌" : 
                     type === "Tent" ? "⛺" : 
                     type === "Trailer" ? "🚛" : 
                     type === "Pickup" ? "🛻" : "🚗"}
                </span>
            </button>
            ))}
        </div>
        
        {hasItems && (
        <>
            <div className={styles.divider} />
            
            <button 
                onClick={onSave}
                className={`${styles.button} ${styles.save}`}
            >
                💾 Save Layout
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

      {/* RIGHT PANEL: Inspector */}
      {selectedItem && (
        <div className={`${styles.panel} ${styles.right}`}>
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
                            // Remember the current name when we start editing
                            initialNameRef.current = selectedItem.name;
                        }}
                        onBlur={(e) => {
                            // If user cleared the name completely, restore reference
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
