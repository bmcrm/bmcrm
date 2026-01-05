import React, { useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Text, useTexture, Billboard } from '@react-three/drei';
import * as THREE from 'three';

import rvTexture from '@shared/assets/images/camp-layout/rv.png';
import tentTexture from '@shared/assets/images/camp-layout/tent.png';
import trailerTexture from '@shared/assets/images/camp-layout/trailer.png';
import pickupTexture from '@shared/assets/images/camp-layout/pickup.png';
import sedanTexture from '@shared/assets/images/camp-layout/sedan.png';

export type CampItemType = 'RV' | 'Tent' | 'Trailer' | 'Pickup' | 'Sedan';

export const ITEM_DIMENSIONS: Record<CampItemType, [number, number, number]> = {
  RV: [10, 2, 30], // Width, Height, Length
  Tent: [10, 2, 10],
  Trailer: [10, 2, 53],
  Pickup: [10, 2, 18],
  Sedan: [10, 2, 15],
};

// Keep colors for selection/border or fallback
export const ITEM_COLORS: Record<CampItemType, string> = {
  RV: 'orange',
  Tent: '#78C850',
  Trailer: '#E0E0E0',
  Pickup: '#2196F3',
  Sedan: '#9C27B0',
};

const ITEM_TEXTURE_URLS: Record<CampItemType, string> = {
  RV: rvTexture,
  Tent: tentTexture,
  Trailer: trailerTexture,
  Pickup: pickupTexture,
  Sedan: sedanTexture,
};

interface CampItemProps {
  id: string;
  type: CampItemType;
  name?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  dimensions?: [number, number, number];
  isGhost?: boolean;
  isDragging?: boolean;
  isInvalid?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onPointerDown?: (e: ThreeEvent<PointerEvent>) => void;
}

const CampItemComponent = ({
  id,
  type,
  name,
  position,
  rotation = [0, 0, 0],
  dimensions,
  isGhost = false,
  isDragging = false,
  isInvalid = false,
  isSelected,
  onSelect,
  onPointerDown,
}: CampItemProps) => {
  const [hovered, setHover] = useState(false);

  // Use provided dimensions or fallback to defaults
  const finalDimensions = dimensions || ITEM_DIMENSIONS[type];
  const width = finalDimensions[0];
  const height = finalDimensions[1];
  const length = finalDimensions[2];

  const textureUrl = ITEM_TEXTURE_URLS[type];
  const texture = useTexture(textureUrl);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (isGhost || isDragging) return;
    e.stopPropagation();
    if (!isDragging) onSelect?.(id);
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isGhost) return;
    e.stopPropagation();
    onPointerDown?.(e);
    onSelect?.(id);
  };

  let boxColor = ITEM_COLORS[type];
  let boxOpacity = 0.0;
  let wireframe = false;

  if (isSelected) {
    boxOpacity = 0.3;
    wireframe = true;
    boxColor = 'yellow';
  } else if (hovered && !isGhost && !isDragging) {
    boxOpacity = 0.2;
    boxColor = 'white';
  }

  if (isInvalid) {
    boxColor = 'red';
    boxOpacity = 0.5;
  }

  let textureOpacity = 1.0;
  let textureColor = 'white';
  if (isGhost) textureOpacity = 0.6;
  if (isDragging) textureOpacity = 0.5;
  if (isInvalid) {
    textureColor = 'red';
  }

  return (
    <group
      name={id}
      position={[position[0], position[1], position[2]]}
      rotation={new THREE.Euler(...rotation)}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color={boxColor} transparent opacity={boxOpacity} wireframe={wireframe} />
      </mesh>

      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <planeGeometry args={[length, width]} />
        <meshBasicMaterial map={texture} transparent opacity={textureOpacity} color={textureColor} side={THREE.DoubleSide} />
      </mesh>

      {!isGhost && (
        <Billboard position={[0, height + 3, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text fontSize={3} color='black' outlineWidth={0.1} outlineColor='white' anchorX='center' anchorY='middle'>
            {name || type}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

export const CampItem = React.memo(CampItemComponent);

Object.values(ITEM_TEXTURE_URLS).forEach(url => useTexture.preload(url));
