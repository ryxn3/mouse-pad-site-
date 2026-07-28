'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  Lightformer,
} from '@react-three/drei';
import { ArmSleeve } from './ArmSleeve';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface ArmSleeveViewerProps {
  className?: string;
}

/** Interactive 3D viewer for the Arm Sleeve. */
export function ArmSleeveViewer({ className }: ArmSleeveViewerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0b0b0b']} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[4, 6, 6]}
            intensity={2.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-5, 2, -2]} intensity={0.9} color="#ffffff" />
          <spotLight position={[-4, 2, 5]} angle={0.6} penumbra={1} intensity={22} color="#B00020" />

          <Float
            speed={reduced ? 0 : 1.2}
            rotationIntensity={reduced ? 0 : 0.25}
            floatIntensity={reduced ? 0 : 0.5}
          >
            <group rotation={[0.1, -0.35, 0.5]}>
              <ArmSleeve />
            </group>
          </Float>

          <ContactShadows position={[0, -3.1, 0]} opacity={0.35} scale={12} blur={2.8} far={5} color="#000000" />

          {/* Self-contained studio environment (no external HDR fetch). */}
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, 3]} scale={[10, 6, 1]} />
            <Lightformer form="rect" intensity={2} color="#ffffff" position={[5, 0, 3]} scale={[4, 8, 1]} />
            <Lightformer form="rect" intensity={1.1} color="#B00020" position={[-5, 1, -2]} scale={[6, 3, 1]} />
          </Environment>

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={4.5}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
