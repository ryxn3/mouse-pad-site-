'use client';

import { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useStrapTexture } from '@/lib/keychainTexture';

/**
 * A high-detail model of the Pegaris Sling Keychain: a matte-black snap-hook
 * clasp, split ring, leather-reinforced head and a woven nylon strap carrying
 * the PEGARIS wordmark and crimson centre stripe.
 *
 * Built to scene scale where 1 unit ≈ 1 cm; the group is centred on the origin.
 */
export function Keychain() {
  const strap = useStrapTexture();

  // Shared materials
  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1c1c1c',
        metalness: 0.9,
        roughness: 0.42,
      }),
    [],
  );
  const leather = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0d0d0d',
        metalness: 0.05,
        roughness: 0.6,
      }),
    [],
  );

  // Snap-hook loop: an almost-closed tube ring with a gap for the gate.
  const hook = useMemo(() => {
    const geo = new THREE.TorusGeometry(0.34, 0.07, 20, 48, Math.PI * 1.55);
    return geo;
  }, []);

  return (
    <group rotation={[0, 0, 0]}>
      {/* ---- Snap-hook clasp ---- */}
      <group position={[0, 2.55, 0]}>
        {/* Hook loop (gap faces up) */}
        <mesh geometry={hook} material={metal} rotation={[0, 0, Math.PI * 0.72]} />
        {/* Spring gate across the opening */}
        <mesh material={metal} position={[0.16, 0.3, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.035, 0.035, 0.42, 12]} />
        </mesh>
        {/* Body of the clasp (the flat elongated part) */}
        <RoundedBox
          args={[0.2, 0.6, 0.11]}
          radius={0.05}
          smoothness={5}
          position={[0, -0.42, 0]}
          material={metal}
        />
        {/* Rivet detail on the body */}
        <mesh material={metal} position={[0, -0.42, 0.06]}>
          <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
        </mesh>
        {/* Swivel eye at the bottom of the clasp */}
        <mesh material={metal} position={[0, -0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.03, 16, 32]} />
        </mesh>
      </group>

      {/* ---- Split ring ---- */}
      <mesh material={metal} position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.028, 16, 40]} />
      </mesh>

      {/* ---- Leather-reinforced head ---- */}
      <RoundedBox
        args={[0.58, 0.5, 0.16]}
        radius={0.05}
        smoothness={5}
        position={[0, 1.2, 0]}
        material={leather}
      />
      {/* Stitching hint on the leather */}
      <mesh position={[0, 1.2, 0.085]}>
        <planeGeometry args={[0.46, 0.38]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.7} />
      </mesh>

      {/* ---- Woven strap ---- */}
      {/* Black webbing base */}
      <RoundedBox
        args={[0.5, 3.0, 0.07]}
        radius={0.03}
        smoothness={4}
        position={[0, -0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#0b0b0b" roughness={0.85} metalness={0.02} />
      </RoundedBox>
      {/* Woven wordmark printed on the front and back faces (clean UVs) */}
      {[0.037, -0.037].map((z, i) => (
        <mesh key={z} position={[0, -0.5, z]} rotation={[0, i === 1 ? Math.PI : 0, 0]}>
          <planeGeometry args={[0.46, 2.92]} />
          <meshStandardMaterial
            map={strap}
            transparent
            roughness={0.85}
            metalness={0.02}
          />
        </mesh>
      ))}
      {/* Folded loop of the strap around the split ring */}
      <RoundedBox
        args={[0.5, 0.42, 0.07]}
        radius={0.03}
        smoothness={4}
        position={[0, 1.15, 0.12]}
        rotation={[0.5, 0, 0]}
      >
        <meshStandardMaterial color="#0b0b0b" roughness={0.85} />
      </RoundedBox>
    </group>
  );
}
