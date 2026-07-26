'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Lightformer, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Mousepad } from './Mousepad';
import { useConfigurator } from '@/state/configurator';
import { PRODUCTS } from '@/lib/products';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { lerp } from '@/lib/utils';

/** Animated pad: slow rotation, gentle float, and a subtle tilt toward the cursor. */
function AnimatedPad({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { surface, size, color, product } = useConfigurator();
  const prod = PRODUCTS[product];

  useFrame((state, delta) => {
    if (!group.current) return;
    const g = group.current;
    if (!reduced) {
      g.rotation.y += delta * 0.12;
    }
    // Tilt toward the pointer for a responsive, tactile feel.
    const targetX = -0.35 + state.pointer.y * 0.25;
    const targetZ = -state.pointer.x * 0.12;
    g.rotation.x = lerp(g.rotation.x, targetX, 0.05);
    g.rotation.z = lerp(g.rotation.z, targetZ, 0.05);
  });

  return (
    <group ref={group} rotation={[-0.35, 0.4, 0]}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={0}
        floatIntensity={reduced ? 0 : 0.6}
        floatingRange={[-0.08, 0.08]}
      >
        <Mousepad
          surface={surface}
          size={size}
          color={color}
          texturePrefix={prod.texturePrefix}
          patterned={prod.patterned}
        />
      </Float>
    </group>
  );
}

/** A crimson key light that slowly orbits the product. */
function OrbitingLight({ reduced }: { reduced: boolean }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!light.current || reduced) return;
    const t = state.clock.elapsedTime * 0.4;
    light.current.position.set(Math.sin(t) * 6, 3, Math.cos(t) * 6);
  });
  return (
    <pointLight
      ref={light}
      color="#B00020"
      intensity={40}
      distance={20}
      position={[4, 3, 4]}
    />
  );
}

interface HeroSceneProps {
  className?: string;
}

/** The fullscreen cinematic hero canvas. */
export function HeroScene({ className }: HeroSceneProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2.2, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#090909']} />
        <fog attach="fog" args={['#090909', 9, 18]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.6}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <spotLight
            position={[-6, 6, -2]}
            angle={0.5}
            penumbra={1}
            intensity={30}
            color="#ffffff"
          />
          <OrbitingLight reduced={reduced} />

          <AnimatedPad reduced={reduced} />

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.55}
            scale={14}
            blur={2.6}
            far={4}
            color="#000000"
          />

          {/* Self-contained studio environment (no external HDR fetch). */}
          <Environment resolution={256} frames={1}>
            <Lightformer
              form="rect"
              intensity={2}
              color="#ffffff"
              position={[0, 5, -2]}
              scale={[10, 5, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.2}
              color="#B00020"
              position={[-5, 2, 2]}
              scale={[6, 3, 1]}
            />
            <Lightformer
              form="circle"
              intensity={1.5}
              color="#ffffff"
              position={[5, 3, 2]}
              scale={[4, 4, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
