import React, { useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Text, useTexture, Billboard, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { EnvConfigs } from '@shared/config/env';
import rvTexture from '@shared/assets/images/camp-layout/rv.png';
import tentTexture from '@shared/assets/images/camp-layout/tent.png';
import trailerTexture from '@shared/assets/images/camp-layout/trailer.png';
import pickupTexture from '@shared/assets/images/camp-layout/pickup.png';
import sedanTexture from '@shared/assets/images/camp-layout/sedan.png';
import domeTexture from '@shared/assets/images/camp-layout/geodesic_dome.png';
import shadeTexture from '@shared/assets/images/camp-layout/shade_structure.png';
import bikesTexture from '@shared/assets/images/camp-layout/bikes_parking.png';
import fuelTexture from '@shared/assets/images/camp-layout/fuel_depot.png';
import firelaneTexture from '@shared/assets/images/camp-layout/firelane.png';

export type CampItemType = 'RV' | 'Tent' | 'Trailer' | 'Pickup' | 'Sedan' | 'Geodesic Dome' | 'Shade Structure' | 'Bikes Parking' | 'Fuel Depot' | 'Firelane';

export const ITEM_DIMENSIONS: Record<CampItemType, [number, number, number]> = {
  RV: [10, 2, 30], // Width, Height, Length
  Tent: [20, 2, 20],
  Trailer: [10, 2, 20],
  Pickup: [10, 2, 10],
  Sedan: [10, 2, 10],
  'Geodesic Dome': [14, 12, 14],
  'Shade Structure': [10, 10, 10],
  'Bikes Parking': [10, 2, 10],
  'Fuel Depot': [10, 2, 10],
  'Firelane': [5, 0.2, 5], 
};

// Keep colors for selection/border or fallback
export const ITEM_COLORS: Record<CampItemType, string> = {
  RV: 'orange',
  Tent: '#78C850',
  Trailer: '#E0E0E0',
  Pickup: '#2196F3',
  Sedan: '#9C27B0',
  'Geodesic Dome': '#FFFFFF',
  'Shade Structure': '#D2B48C', 
  'Bikes Parking': '#607D8B',
  'Fuel Depot': '#F44336',
  'Firelane': '#FF5722',
};

const ITEM_TEXTURE_URLS: Record<CampItemType, string> = {
  RV: rvTexture,
  Tent: tentTexture,
  Trailer: trailerTexture,
  Pickup: pickupTexture,
  Sedan: sedanTexture,
  'Geodesic Dome': domeTexture,
  'Shade Structure': shadeTexture,
  'Bikes Parking': bikesTexture,
  'Fuel Depot': fuelTexture,
  'Firelane': firelaneTexture,
};

const ITEM_GLTF_URLS: Partial<Record<CampItemType, string>> = {
  Trailer: `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/trailer.glb`,
  RV: `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/rv.glb`,
  Pickup: `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/pickup.glb`,
  Sedan: `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/sedan.glb`,
  'Bikes Parking': `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/bicycle_parking.glb`,
  Tent: `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/tent_big.glb`,
  'Geodesic Dome': `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/geodesic_dome.glb`,
  'Shade Structure': `${EnvConfigs.MODELS_CLOUDFRONT_BASE_URL}/tent.glb`,
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

const GltfModel = ({
  url,
  dimensions,
  isInvalid,
  isGhost,
  isDragging,
  color,
}: {
  url: string;
  dimensions: [number, number, number];
  isInvalid?: boolean;
  isGhost?: boolean;
  isDragging?: boolean;
  color?: string;
}) => {
  const { scene } = useGLTF(url);

  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();

    // Calculate bounding box and center of the imported model
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center the clone so its bottom is at y=0, and it's centered on X and Z
    clone.position.set(-center.x, -box.min.y, -center.z);

    const group = new THREE.Group();
    group.add(clone);

    const [targetW, , targetL] = dimensions;

    // Determine if we need to rotate 90 degrees to align longest edges
    const targetIsLongZ = targetL > targetW;
    const modelIsLongZ = size.z > size.x;

    let groupRotY = 0;
    let actualModelW = size.x;
    let actualModelL = size.z;

    if (targetIsLongZ !== modelIsLongZ) {
      groupRotY = Math.PI / 2;
      actualModelW = size.z;
      actualModelL = size.x;
    }

    const scaleX = actualModelW === 0 ? 1 : targetW / actualModelW;
    const scaleZ = actualModelL === 0 ? 1 : targetL / actualModelL;

    // Use uniform scaling to prevent model stretching / texture smearing
    const uniformScale = Math.min(scaleX, scaleZ);

    group.scale.set(uniformScale, uniformScale, uniformScale);
    group.rotation.y = groupRotY;

    // Adjust materials
    group.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        if (child.material.map) {
          child.material.map.anisotropy = 16;
          child.material.map.needsUpdate = true;
        }
        if (isGhost || isDragging) {
          child.material.transparent = true;
          child.material.opacity = isGhost ? 0.6 : 0.5;
        }
        if (isInvalid) {
          child.material.color?.set('red');
        } else if (color) {
          child.material.color?.set(color);
        }
      }
    });

    return group;
  }, [scene, dimensions, isInvalid, isGhost, isDragging]);

  return <primitive object={clonedScene} />;
};

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
      {ITEM_GLTF_URLS[type] ? (
        <GltfModel
          url={ITEM_GLTF_URLS[type]!}
          dimensions={[width, height, length]}
          isInvalid={isInvalid}
          isGhost={isGhost}
          isDragging={isDragging}
          color={(type === 'Sedan' || type === 'Pickup') ? 'white' : undefined}
        />
      ) : (
        <>
          <mesh position={[0, height / 2, 0]}>
            <boxGeometry args={[width, height, length]} />
            <meshStandardMaterial color={boxColor} transparent opacity={boxOpacity} wireframe={wireframe} />
          </mesh>

          <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            <planeGeometry args={[length, width]} />
            <meshBasicMaterial map={texture} transparent opacity={textureOpacity} color={textureColor} side={THREE.DoubleSide} />
          </mesh>
        </>
      )}
      
      {/* Fuel Depot Clearance Ring (10ft extra radius visualization) - Only during placement */}
      {type === 'Fuel Depot' && isGhost && (
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[Math.max(width, length) / 2, Math.max(width, length) / 2 + 10, 32]} />
              <meshBasicMaterial color="red" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
      )}

      {!isGhost && (
        <Billboard position={[0, height + 6, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text fontSize={1.5} color='black' outlineWidth={0.05} outlineColor='white' anchorX='center' anchorY='middle'>
            {name || type}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

export const CampItem = React.memo(CampItemComponent);

Object.values(ITEM_TEXTURE_URLS).forEach(url => useTexture.preload(url));
Object.values(ITEM_GLTF_URLS).forEach(url => useGLTF.preload(url as string));
