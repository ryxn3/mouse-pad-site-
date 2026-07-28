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
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.6}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-5, 3, -3]}
            angle={0.5}
            penumbra={1}
            intensity={22}
            color="#B00020"
          />

          <Float
            speed={reduced ? 0 : 1.4}
            rotationIntensity={reduced ? 0 : 0.4}
            floatIntensity={reduced ? 0 : 0.5}
          >
            <group rotation={[0.1, -0.3, 0.08]}>
              <Keychain />
            </group>
          </Float>

          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.4}
            scale={10}
            blur={2.6}
            far={5}
            color="#000000"
          />

          {/* Self-contained studio environment (no external HDR fetch). */}
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 5, 2]} scale={[10, 6, 1]} />
            <Lightformer form="rect" intensity={1} color="#B00020" position={[-5, 1, -2]} scale={[6, 3, 1]} />
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
