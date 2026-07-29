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
import { WristRest } from './WristRest';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface WristRestViewerProps {
  widthMm: number;
  className?: string;
}

/** Interactive 3D viewer for the Wrist Rest (length follows the chosen size). */
export function WristRestViewer({ widthMm, className }: WristRestViewerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2.4, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0b0b0b']} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[4, 7, 5]}
            intensity={2.1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-5, 3, -2]} intensity={0.9} color="#ffffff" />
          <spotLight position={[-4, 3, 4]} angle={0.6} penumbra={1} intensity={22} color="#B00020" />

          <Float
            speed={reduced ? 0 : 1.2}
            rotationIntensity={reduced ? 0 : 0.15}
            floatIntensity={reduced ? 0 : 0.5}
          >
            <group rotation={[-0.15, -0.4, 0]}>
              <WristRest widthMm={widthMm} />
            </group>
          </Float>

          <ContactShadows position={[0, -0.7, 0]} opacity={0.4} scale={12} blur={2.6} far={4} color="#000000" />

          {/* Self-contained studio environment (no external HDR fetch). */}
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, 3]} scale={[12, 6, 1]} />
            <Lightformer form="rect" intensity={1.2} color="#B00020" position={[-5, 1, -2]} scale={[6, 3, 1]} />
          </Environment>

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={4}
            maxDistance={13}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
