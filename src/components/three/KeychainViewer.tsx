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
import { Keychain } from './Keychain';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface KeychainViewerProps {
  className?: string;
}

/** Interactive 3D viewer for the Sling Keychain — rotate, zoom, inspect. */
export function KeychainViewer({ className }: KeychainViewerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0b0b0b']} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[4, 7, 6]}
            intensity={2.4}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-5, 3, -2]} intensity={1.1} color="#ffffff" />
          <spotLight
            position={[-4, 2, 4]}
            angle={0.6}
            penumbra={1}
            intensity={26}
            color="#B00020"
          />

          <Float
            speed={reduced ? 0 : 1.3}
            rotationIntensity={reduced ? 0 : 0.22}
            floatIntensity={reduced ? 0 : 0.5}
          >
            <group position={[0, -0.4, 0]} rotation={[0.05, -0.15, 0]}>
              <Keychain />
            </group>
          </Float>

          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.35}
            scale={10}
            blur={2.6}
            far={5}
            color="#000000"
          />

          {/* Self-contained studio environment (no external HDR fetch). */}
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3.2} color="#ffffff" position={[0, 5, 3]} scale={[10, 6, 1]} />
            <Lightformer form="rect" intensity={2} color="#ffffff" position={[4, 0, 4]} scale={[4, 8, 1]} />
            <Lightformer form="rect" intensity={1.2} color="#B00020" position={[-5, 1, -2]} scale={[6, 3, 1]} />
          </Environment>

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={4}
            maxDistance={14}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
