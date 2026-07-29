'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useStrapTexture } from '@/lib/keychainTexture';

/* ------------------------------------------------------------------ */
/*  2D shape helpers                                                   */
/* ------------------------------------------------------------------ */

/** A rounded rectangle shape centred on the origin. */
function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** A closed annular sector — a solid curved bar (the hook body). */
function ringSector(rOuter: number, rInner: number, a0: number, a1: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOuter, a0, a1, false);
  s.absarc(0, 0, rInner, a1, a0, true);
  return s;
}

/** A full washer/ring with a hole. */
function annulus(rOuter: number, rInner: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOuter, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rInner, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

/** Extrude a 2D shape into a bevelled, depth-centred solid. */
function extrude(shape: THREE.Shape, depth: number, bevel = 0.02): THREE.ExtrudeGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 48,
    steps: 1,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

/** Small "°CLASP°" engraving printed on the clasp body. */
function useClaspTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const w = 128;
    const h = 512;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#161616';
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#3a3a3a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 44px Arial, sans-serif';
    ctx.fillText('°CLASP°', 0, -70);
    ctx.font = '600 22px Arial, sans-serif';
    ctx.fillText('PEGARIS', 0, 90);
    ctx.restore();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Model                                                              */
/* ------------------------------------------------------------------ */

/**
 * A high-detail model of the Pegaris Sling Keychain: an extruded matte-black
 * snap-hook clasp with a spring gate, a swivel eye, a split ring, a
 * leather-reinforced head with stitching, and a woven nylon strap carrying the
 * PEGARIS wordmark and crimson centre stripe. 1 unit ≈ 1 cm; centred on origin.
 */
export function Keychain() {
  const strap = useStrapTexture();
  const claspTex = useClaspTexture();

  /* Materials */
  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#242424',
        metalness: 1,
        roughness: 0.3,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1.4,
      }),
    [],
  );
  const gateMetal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0e0e0e',
        metalness: 1,
        roughness: 0.28,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
      }),
    [],
  );
  const leather = useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: '#0c0c0c', metalness: 0.05, roughness: 0.55 }),
    [],
  );

  /* Geometry (memoised) — slim, elongated proportions */
  const hookGeo = useMemo(() => extrude(ringSector(0.26, 0.185, Math.PI * 1.18, Math.PI * 2.82), 0.07, 0.02), []);
  const bodyGeo = useMemo(() => extrude(roundedRect(0.16, 0.78, 0.075), 0.075, 0.02), []);
  const gateGeo = useMemo(() => extrude(roundedRect(0.05, 0.24, 0.025), 0.06, 0.015), []);
  const eyeGeo = useMemo(() => extrude(annulus(0.095, 0.055), 0.06, 0.018), []);
  const ringGeo = useMemo(() => extrude(annulus(0.15, 0.108), 0.045, 0.02), []);
  const patchGeo = useMemo(() => extrude(roundedRect(0.42, 0.36, 0.06), 0.09, 0.025), []);

  return (
    <group>
      {/* ---- Snap-hook clasp ---- */}
      <group position={[0, 2.15, 0]}>
        {/* Slim body with CLASP engraving */}
        <mesh geometry={bodyGeo} material={metal} />
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[0.12, 0.66]} />
          <meshStandardMaterial map={claspTex} metalness={0.9} roughness={0.4} />
        </mesh>

        {/* Hook loop on top (gap faces up for the gate) */}
        <mesh geometry={hookGeo} material={metal} position={[0, 0.5, 0]} />
        {/* Spring gate bridging the opening */}
        <mesh geometry={gateGeo} material={gateMetal} position={[0.09, 0.6, 0.01]} rotation={[0, 0, -0.6]} />
        {/* Gate pivot rivet */}
        <mesh material={gateMetal} position={[-0.02, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.14, 16]} />
        </mesh>

        {/* Swivel eye at the bottom */}
        <mesh geometry={eyeGeo} material={metal} position={[0, -0.48, 0]} />
      </group>

      {/* ---- Split ring ---- */}
      <mesh geometry={ringGeo} material={metal} position={[0, 1.42, 0]} />

      {/* ---- Leather-reinforced head ---- */}
      <group position={[0, 1.02, 0]}>
        <mesh geometry={patchGeo} material={leather} />
        {/* Stitch outline */}
        <mesh position={[0, 0, 0.048]}>
          <ringGeometry args={[0.14, 0.145, 4, 1, Math.PI / 4]} />
          <meshStandardMaterial color="#2a2a2a" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ---- Woven strap ---- */}
      <mesh position={[0, -0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 3.0, 0.05]} />
        <meshStandardMaterial color="#0b0b0b" roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Woven wordmark on the front and back faces (clean UVs) */}
      {[0.028, -0.028].map((z, i) => (
        <mesh key={z} position={[0, -0.72, z]} rotation={[0, i === 1 ? Math.PI : 0, 0]}>
          <planeGeometry args={[0.34, 2.9]} />
          <meshStandardMaterial map={strap} roughness={0.85} metalness={0.02} />
        </mesh>
      ))}
      {/* Folded loop of strap through the split ring */}
      <mesh position={[0, 1.28, 0.09]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.38, 0.42, 0.05]} />
        <meshStandardMaterial color="#0b0b0b" roughness={0.85} />
      </mesh>
    </group>
  );
}
