import type { ThreeEvent } from '@react-three/fiber';

interface GridPlaneProps {
  size?: number;
  divisions?: number;
  onPlaneClick?: (point: [number, number, number]) => void;
  onPlaneHover?: (point: [number, number, number]) => void;
}

export const GridPlane = ({ size = 100, divisions = 10, onPlaneClick, onPlaneHover }: GridPlaneProps) => {
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onPlaneClick?.([e.point.x, e.point.y, e.point.z]);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    onPlaneHover?.([e.point.x, e.point.y, e.point.z]);
  };

  return (
    <group>
      <gridHelper args={[size, divisions, 'black', 'gray']} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} onClick={handleClick} onPointerMove={handlePointerMove}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color='#e6d0b3' />
      </mesh>
    </group>
  );
};
