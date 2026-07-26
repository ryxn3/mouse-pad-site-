'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Lightformer,
} from '@react-three/drei';
import { Mousepad } from './Mousepad';
import type { SizeId, SurfaceId, ColorId } from '@/types';

interface ProductViewerProps {
  surface: SurfaceId;
  size: SizeId;
  color: ColorId;
  texturePrefix?: 'cloth' | 'pattern';
  patterned?: boolean;
  className?: string;
}

/**
 * Interactive 3D product viewer — rotate, zoom, pan and inspect the pad with
 * realistic materials, premium lighting and soft contact shadows.
 * Touch gestures are supported for mobile inspection.
 */
export function ProductViewer({
  surface,
  size,
  color,
  texturePrefix = 'cloth',
  patterned = false,
  className,
}: ProductViewerProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 3.5, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0b0b0b']} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[4, 8, 4]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-5, 6, -3]}
            angle={0.5}
            penumbra={1}
            intensity={25}
            color="#B00020"
          />

          <group rotation={[-0.2, 0, 0]}>
            <Mousepad
              surface={surface}
              size={size}
              color={color}
              texturePrefix={texturePrefix}
              patterned={patterned}
            />
          </group>

          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.5}
            scale={12}
            blur={2.4}
            far={3}
            color="#000000"
          />
          {/* Self-contained studio environment (no external HDR fetch). */}
          <Environment resolution={256} frames={1}>
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#ffffff"
              position={[0, 5, 2]}
              scale={[10, 5, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1}
              color="#B00020"
              position={[-5, 2, -2]}
              scale={[6, 3, 1]}
            />
          </Environment>
          <OrbitControls
            enablePan
            enableZoom
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
