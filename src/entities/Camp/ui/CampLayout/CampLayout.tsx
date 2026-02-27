import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { v4 as uuidv4 } from 'uuid';
import { GridPlane } from './Scene/GridPlane';
import { CampItem, ITEM_DIMENSIONS } from './Scene/CampItem';
import { UIOverlay } from './Scene/UIOverlay';
import styles from './CampLayout.module.scss';
import { useCreateCampLayout } from '@entities/Camp/hooks/useCreateCampLayout';
import { useGetCampLayout } from '@entities/Camp/hooks/useGetCampLayout';
import { useDeleteCampLayout } from '@entities/Camp/hooks/useDeleteCampLayout';
import { Modal } from '@shared/ui/Modal';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { CampDefaultSizesModal } from '@features/CampDefaultSizesModal/ui/CampDefaultSizesModal';


export type CampItemType = 'RV' | 'Tent' | 'Trailer' | 'Pickup' | 'Sedan' | 'Geodesic Dome' | 'Shade Structure' | 'Bikes Parking' | 'Fuel Depot' | 'Firelane';

export interface PlacedItem {
  id: string;
  type: CampItemType;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  dimensions: [number, number, number]; // [width, height, length]
}

const AVAILABLE_ITEMS: CampItemType[] = [
    'RV', 'Tent', 'Trailer', 'Pickup', 'Sedan', 
    'Geodesic Dome', 'Shade Structure', 'Bikes Parking', 'Fuel Depot'
];

const GRID_SIZE = 100;
const GRID_CELL_SIZE = 10;
const GRID_HALF_SIZE = GRID_SIZE / 2;

// Helper to check standard AABB collision
// Assuming Y is 0 for all on ground, we only check X and Z.
const checkAABB = (
  posA: [number, number, number],
  dimA: [number, number, number],
  posB: [number, number, number],
  dimB: [number, number, number]
) => {
  // A bounds
  const minAx = posA[0] - dimA[0] / 2;
  const maxAx = posA[0] + dimA[0] / 2;
  const minAz = posA[2] - dimA[2] / 2;
  const maxAz = posA[2] + dimA[2] / 2;

  // B bounds
  const minBx = posB[0] - dimB[0] / 2;
  const maxBx = posB[0] + dimB[0] / 2;
  const minBz = posB[2] - dimB[2] / 2;
  const maxBz = posB[2] + dimB[2] / 2;

  // Check intersection
  const intersectX = minAx < maxBx && maxAx > minBx;
  const intersectZ = minAz < maxBz && maxAz > minBz;

  return intersectX && intersectZ;
};

// Helper to get effective dimensions based on rotation (90 degree steps)
const getRotatedDimensions = (dimensions: [number, number, number], rotation: [number, number, number]): [number, number, number] => {
  // Check if rotated 90 or 270 degrees (roughly) around Y
  // Our rotation is [0, PI/2 * n, 0]
  // Math.PI / 2 is approx 1.57.
  const yRot = rotation[1] % Math.PI;
  // If roughly PI/2 (1.57), swap.
  const isRotated90 = Math.abs(yRot - Math.PI / 2) < 0.1 || Math.abs(yRot + Math.PI / 2) < 0.1;

  if (isRotated90) {
    return [dimensions[2], dimensions[1], dimensions[0]];
  }
  return dimensions;
};

export const CampLayout = () => {
  const { mutate: deleteCampLayout, isPending: isDeletePending } = useDeleteCampLayout();
  const { mutate: createCampLayout, isPending: isCreatePending } = useCreateCampLayout();
  const { data: campLayoutData, isLoading: isCampLayoutLoading } = useGetCampLayout();

  const [items, setItems] = useState<PlacedItem[]>(() => {
    try {
      const stored = localStorage.getItem('campLayoutScene');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
    }

    if (campLayoutData?.layout_schema) {
      try {
        const parsed = JSON.parse(campLayoutData.layout_schema);
        localStorage.setItem('campLayoutScene', campLayoutData.layout_schema);
        return parsed;
      } catch {
        return [];
      }
    }
    return [];
  });

  const [defaultSizes, setDefaultSizes] = useState<typeof ITEM_DIMENSIONS>(() => {
      try {
          const stored = localStorage.getItem('campDefaultSizes');
          if (stored) {
              const parsed = JSON.parse(stored);
              return { ...ITEM_DIMENSIONS, ...parsed };
          }
          return ITEM_DIMENSIONS;
      } catch {
          return ITEM_DIMENSIONS;
      }
  });

  const [isDefaultSizesModalOpen, setIsDefaultSizesModalOpen] = useState(false);

  useEffect(() => {
    if (campLayoutData?.layout_schema) {
      try {
        const parsed = JSON.parse(campLayoutData.layout_schema);
        setItems(parsed);
        localStorage.setItem('campLayoutScene', campLayoutData.layout_schema);
      } catch {
      }
    }
  }, [campLayoutData]);

  useEffect(() => {
    localStorage.setItem('campLayoutScene', JSON.stringify(items));
  }, [items]);

  const [isDeleteAgreed, setIsDeleteAgreed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragMode, setDragMode] = useState<CampItemType | null>(null);
  const [hoverPosition, setHoverPosition] = useState<[number, number, number] | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<[number, number, number] | null>(null);
  const [isHoverValid, setIsHoverValid] = useState(true);

  const selectedItem = items.find(i => i.id === selectedId);

  const handleAddItem = (type: CampItemType) => {
    setDragMode(type);
    setSelectedId(null);
  };

  const getBoundedPosition = (point: [number, number, number], dimensions: [number, number, number]): [number, number, number] => {
    const halfWidth = dimensions[0] / 2;
    const halfLength = dimensions[2] / 2;

    // Clamp X
    let x = point[0];
    if (x - halfWidth < -GRID_HALF_SIZE) x = -GRID_HALF_SIZE + halfWidth;
    if (x + halfWidth > GRID_HALF_SIZE) x = GRID_HALF_SIZE - halfWidth;

    // Clamp Z
    let z = point[2];
    if (z - halfLength < -GRID_HALF_SIZE) z = -GRID_HALF_SIZE + halfLength;
    if (z + halfLength > GRID_HALF_SIZE) z = GRID_HALF_SIZE - halfLength;

    return [x, point[1], z];
  };

  const getSnappedPosition = (point: [number, number, number]): [number, number, number] => {
    return [Math.round(point[0]), 0, Math.round(point[2])];
  };

  const validatePosition = (
    pos: [number, number, number],
    dims: [number, number, number],
    rot: [number, number, number],
    ignoreId: string | null
  ) => {
    const effectiveDims = getRotatedDimensions(dims, rot);

    for (const item of items) {
      if (item.id === ignoreId) continue;
      const otherDims = getRotatedDimensions(item.dimensions, item.rotation);
      if (checkAABB(pos, effectiveDims, item.position, otherDims)) {
        return false; // Collision
      }
    }
    return true;
  };

  const handlePlaneHover = (point: [number, number, number]) => {
    let snappedPos = getSnappedPosition(point);

    if (dragMode) {
      const dims = ITEM_DIMENSIONS[dragMode] as [number, number, number];
      const effDims = getRotatedDimensions(dims, [0, 0, 0]);

      snappedPos = getBoundedPosition(snappedPos, effDims);

      setHoverPosition(snappedPos);
      setIsHoverValid(validatePosition(snappedPos, dims, [0, 0, 0], null));
    } else if (draggedItemId) {
      const item = items.find(i => i.id === draggedItemId);
      if (item) {
        const effDims = getRotatedDimensions(item.dimensions, item.rotation);
        snappedPos = getBoundedPosition(snappedPos, effDims);

        const isValid = validatePosition(snappedPos, item.dimensions, item.rotation, draggedItemId);

        setItems(
          items.map(i => {
            if (i.id === draggedItemId) {
              return { ...i, position: snappedPos };
            }
            return i;
          })
        );
        setIsHoverValid(isValid);
      }
    } else {
      setHoverPosition(null);
      setIsHoverValid(true);
    }
  };

  const handlePlaneClick = (point: [number, number, number]) => {
    if (dragMode) {
      if (!isHoverValid) return;

      let snappedPos = getSnappedPosition(point);
      const dimensions = ITEM_DIMENSIONS[dragMode] as [number, number, number];
      const effDims = getRotatedDimensions(dimensions, [0, 0, 0]);
      snappedPos = getBoundedPosition(snappedPos, effDims);

      if (!validatePosition(snappedPos, dimensions, [0, 0, 0], null)) return;

      const newItem: PlacedItem = {
        id: uuidv4(),
        type: dragMode,
        name: dragMode,
        position: snappedPos,
        rotation: [0, 0, 0],
        dimensions: [...dimensions],
      };
      setItems([...items, newItem]);
      setDragMode(null); // Finish placing
      setHoverPosition(null);
      setSelectedId(newItem.id);
    } else {
      if (!draggedItemId) {
        setSelectedId(null);
      }
    }
  };

  const handleDragStart = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setDragStartPos(item.position);
      setDraggedItemId(id);
      setSelectedId(id);
      setIsHoverValid(true);
    }
  };

  const handlePointerUp = () => {
    if (draggedItemId && !isHoverValid && dragStartPos) {
      // Revert to start position
      setItems(
        items.map(i => {
          if (i.id === draggedItemId) {
            return { ...i, position: dragStartPos };
          }
          return i;
        })
      );
    }
    if (draggedItemId) {
      setDraggedItemId(null);
      setDragStartPos(null);
      setIsHoverValid(true); // Reset validity visual
    }
  };

  const handleItemSelect = (id: string) => {
    if (!dragMode && !draggedItemId) {
      setSelectedId(id);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedId) {
      setItems(items.filter(i => i.id !== selectedId));
      setSelectedId(null);
    }
  };

  const handleRotateSelected = () => {
    if (selectedId) {
      setItems(
        items.map(i => {
          if (i.id === selectedId) {
            const newRotation = [i.rotation[0], i.rotation[1] + Math.PI / 2, i.rotation[2]] as [number, number, number];

            const effectiveDims = getRotatedDimensions(i.dimensions, newRotation);

            const boundedPos = getBoundedPosition(i.position, effectiveDims);
            if (boundedPos[0] !== i.position[0] || boundedPos[2] !== i.position[2]) {
              return i;
            }

            if (!validatePosition(i.position, i.dimensions, newRotation, i.id)) {
              return i;
            }

            return {
              ...i,
              rotation: newRotation,
            };
          }
          return i;
        })
      );
    }
  };

  const handleDimensionChange = (dimensionIndex: 0 | 2, value: string) => {
    if (selectedId) {
      const numValue = parseFloat(value);
      // Min size = GRID_CELL_SIZE (10)
      if (!isNaN(numValue) && numValue >= GRID_CELL_SIZE) {
        setItems(
          items.map(i => {
            if (i.id === selectedId) {
              const newDims = [...i.dimensions] as [number, number, number];
              newDims[dimensionIndex] = numValue;
              const boundedPos = getBoundedPosition(i.position, newDims);
              return { ...i, dimensions: newDims, position: boundedPos };
            }
            return i;
          })
        );
      }
    }
  };

  const handleNameChange = (name: string) => {
    if (selectedId) {
      setItems(
        items.map(i => {
          if (i.id === selectedId) {
            return { ...i, name };
          }
          return i;
        })
      );
    }
  };

  const handleSave = () => {
    const data = JSON.stringify(items);
    // Also call the API to save to backend
    createCampLayout({ layout: data });
  };

  const handleClear = () => {
    deleteCampLayout(undefined, {
      onError: () => {
        setItems([]);
        localStorage.removeItem('campLayoutScene');
      },
      onSuccess: () => {
        setItems([]);
        localStorage.removeItem('campLayoutScene');
      }
    });
    setIsDeleteAgreed(false);
    setSelectedId(null);
  };
  const handleDeleteScene = () => {
    setIsDeleteAgreed(true);
  };

  // Handle Escape key to cancel selection/drag
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDragMode(null);
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Use a softer loading state since we have local storage fallback
  if (isCampLayoutLoading && items.length === 0) {
    return (
      <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      onPointerUp={handlePointerUp}
      onContextMenu={e => {
        e.preventDefault();
        setDragMode(null);
        setSelectedId(null);
      }}
    >
      {(isCreatePending || isDeletePending) && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1000,
        }}>
          <Loader />
        </div>
      )}

      <UIOverlay
        availableItems={AVAILABLE_ITEMS}
        dragMode={dragMode}
        selectedItem={selectedItem || null}
        onAddItem={handleAddItem}
        onNameChange={handleNameChange}
        onDimensionChange={handleDimensionChange}
        onRotate={handleRotateSelected}
        onDelete={handleDeleteSelected}
        onSave={handleSave}
        onClear={handleDeleteScene}
        onOpenSettings={() => setIsDefaultSizesModalOpen(true)}
        hasItems={items.length > 0}
      />

      <Canvas
        className={styles.canvas}
        camera={{ position: [50, 50, 50], fov: 45 }}
        shadows
        onPointerMissed={() => {
          setDragMode(null);
          setSelectedId(null);
        }}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <GridPlane size={100} divisions={10} onPlaneClick={handlePlaneClick} onPlaneHover={handlePlaneHover} />

        <Suspense fallback={null}>
          {/* Placed Items */}
          {items.map(item => (
            <CampItem
              key={item.id}
              {...item}
              isSelected={selectedId === item.id}
              isDragging={draggedItemId === item.id}
              isInvalid={draggedItemId === item.id && !isHoverValid}
              onSelect={handleItemSelect}
              onPointerDown={() => handleDragStart(item.id)}
            />
          ))}

          {/* Ghost Item */}
        {/* {selectedId && !dragMode && !draggedItemId && (
            <TransformGizmo 
                id={selectedId} 
                onScaleEnd={handleScaleEnd} 
                currentDimensions={items.find(i => i.id === selectedId)?.dimensions}
                minSize={10}
            />
        )} */}

        {dragMode && hoverPosition && (
            <CampItem
              id='ghost'
              type={dragMode}
              position={hoverPosition}
              isGhost={true}
              isInvalid={!isHoverValid}
              dimensions={defaultSizes[dragMode] as [number, number, number]}
            />
          )}
        </Suspense>

        <OrbitControls makeDefault enabled={!draggedItemId} maxPolarAngle={Math.PI / 3} />
      </Canvas>
      {isDeleteAgreed && (
        <Modal isOpen={isDeleteAgreed} onClose={close}>
          <div className={styles.deleteModal}>
            <p>Are you sure you want to delete the entire camp layout?</p>
            <div className={styles.deleteModalButtons}>
              <Button onClick={handleClear}>Yes, Delete</Button>
              <Button className={styles.cancelButton} theme={ButtonTheme.OUTLINE} onClick={() => setIsDeleteAgreed(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
        <CampDefaultSizesModal 
            isOpen={isDefaultSizesModalOpen}
            onClose={() => setIsDefaultSizesModalOpen(false)}
            currentDefaults={defaultSizes}
            onSave={(newDefaults: typeof ITEM_DIMENSIONS) => {
                setDefaultSizes(newDefaults);
                localStorage.setItem('campDefaultSizes', JSON.stringify(newDefaults));
            }}
        />
    </div>
  );
};
