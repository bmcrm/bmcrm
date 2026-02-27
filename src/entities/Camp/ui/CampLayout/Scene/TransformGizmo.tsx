import { useRef, useEffect, useMemo } from 'react';
import { TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface TransformGizmoProps {
  id: string;
  onScaleEnd: (scale: THREE.Vector3) => void;
  currentDimensions?: [number, number, number];
  minSize?: number;
}

const createArrowGeometry = () => {
  const shape = new THREE.Shape();
  const w = 0.2;
  const h = 0.4;
  const s = 0.08;
  const l = 0.8;

  shape.moveTo(l, 0);
  shape.lineTo(l - h, w);
  shape.lineTo(l - h, s);
  shape.lineTo(-(l - h), s);
  shape.lineTo(-(l - h), w);
  shape.lineTo(-l, 0);
  shape.lineTo(-(l - h), -w);
  shape.lineTo(-(l - h), -s);
  shape.lineTo(l - h, -s);
  shape.lineTo(l - h, -w);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false });
  geo.rotateX(Math.PI / 2);
  return geo;
};

export const TransformGizmo = ({ id, onScaleEnd, currentDimensions, minSize = 10 }: TransformGizmoProps) => {
  const scene = useThree((state) => state.scene);
  const object = scene.getObjectByName(id);
  const transformRef = useRef<any>(null);

  const arrowGeoX = useMemo(() => createArrowGeometry(), []);
  const arrowGeoZ = useMemo(() => {
    const geo = createArrowGeometry();
    geo.rotateY(Math.PI / 2);
    return geo;
  }, []);

  useEffect(() => {
    if (!transformRef.current || !object) return;

    const controls = transformRef.current;

    const injectCustomGizmos = () => {
      const gizmoGroup = controls._gizmo?.gizmo?.scale;
      if (!gizmoGroup) return;

      gizmoGroup.traverse((child: any) => {
        if (child.isMesh) {
          // Скрываем все, кроме X и Z осей
          if (['XYZ', 'XY', 'YZ', 'XZ', 'Y'].includes(child.name)) {
            child.visible = false;
          }

          if (child.name === 'X' && !child.userData.isCustom) {
            child.geometry = arrowGeoX;
            child.material = new THREE.MeshBasicMaterial({ color: 'red', depthTest: false, transparent: true });
            child.userData.isCustom = true;
          }

          if (child.name === 'Z' && !child.userData.isCustom) {
            child.geometry = arrowGeoZ;
            child.material = new THREE.MeshBasicMaterial({ color: 'blue', depthTest: false, transparent: true });
            child.userData.isCustom = true;
          }
        }
      });
    };

    const handleChange = () => {
      injectCustomGizmos(); 

      if (currentDimensions) {
        const scaleX = object.scale.x;
        const scaleZ = object.scale.z;
        
        if (currentDimensions[0] * scaleX < minSize) {
          object.scale.x = minSize / currentDimensions[0];
        }
        if (currentDimensions[2] * scaleZ < minSize) {
          object.scale.z = minSize / currentDimensions[2];
        }
        object.scale.y = 1;
      }
    };

    const timeout = setTimeout(injectCustomGizmos, 50);
    
    controls.addEventListener('change', handleChange);
    
    return () => {
      clearTimeout(timeout);
      controls.removeEventListener('change', handleChange);
    };
  }, [object, arrowGeoX, arrowGeoZ, minSize, currentDimensions]);

  if (!object) return null;

  return (
    <TransformControls
      ref={transformRef}
      object={object}
      mode="scale"
      showY={false}
      onMouseUp={() => {
        if (object) {
          onScaleEnd(object.scale.clone());
          object.scale.set(1, 1, 1);
        }
      }}
    />
  );
};