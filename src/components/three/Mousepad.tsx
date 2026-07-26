'use client';

import { useEffect, useMemo, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useLogoTexture } from '@/lib/logoTexture';
import { withBasePath } from '@/lib/basePath';
import { SIZES, SURFACES } from '@/lib/products';
import type { SizeId, SurfaceId, ColorId } from '@/types';

interface MousepadProps {
  size: SizeId;
  surface: SurfaceId;
  color: ColorId;
}

/** A procedural fabric grain used as an immediate fallback for the pad surface. */
function makeProceduralFabric(): THREE.CanvasTexture {
  const s = 512;
  const canvas = document.createElement('canvas');
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, s, s);
  const img = ctx.getImageData(0, 0, s, s);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = 6 + Math.random() * 10;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

/**
 * The pad surface texture. Loads the real micro-woven cloth photo for the
 * selected colourway and tiles it across the pad; falls back to a procedural
 * grain until (or unless) it loads.
 */
function useFabricTexture(color: ColorId): THREE.Texture {
  const fallback = useMemo(makeProceduralFabric, []);
  const [texture, setTexture] = useState<THREE.Texture>(fallback);

  useEffect(() => {
    let active = true;
    // Weave colourways tile as fabric; the red variant is a designed graphic
    // that maps once across the whole pad.
    const patterned = color === 'red';
    new THREE.TextureLoader().load(
      withBasePath(`/textures/cloth-${color}.png`),
      (tex) => {
        if (!active) return;
        if (patterned) {
          tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.repeat.set(1, 1);
        } else {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(2, 2);
        }
        tex.anisotropy = 8;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
    );
    return () => {
      active = false;
    };
  }, [color]);

  return texture;
}

/** Builds a dashed rounded-rectangle outline to simulate the stitched border. */
function StitchOutline({ w, h, y }: { w: number; h: number; y: number }) {
  const geometry = useMemo(() => {
    const r = 0.22;
    const shape = new THREE.Shape();
    const hw = w / 2 - 0.06;
    const hh = h / 2 - 0.06;
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    const points = shape.getPoints(200);
    const geo = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, 0, p.y)),
    );
    return geo;
  }, [w, h]);

  const material = useMemo(
    () =>
      new THREE.LineDashedMaterial({
        color: '#3a3a3a',
        dashSize: 0.05,
        gapSize: 0.04,
        transparent: true,
        opacity: 0.9,
      }),
    [],
  );

  // A dashed line needs per-vertex distances computed for the dashes to show.
  const line = useMemo(() => {
    const l = new THREE.Line(geometry, material);
    l.computeLineDistances();
    return l;
  }, [geometry, material]);

  return <primitive object={line} position={[0, y, 0]} />;
}

/**
 * The Pegaris Pro mousepad — a procedurally modelled cloth pad with rounded
 * corners, a stitched border, matte fabric material and the brand logo in the
 * upper-right corner (matching the real product).
 */
export function Mousepad({ size, surface, color }: MousepadProps) {
  const dims = SIZES[size];
  const accent = SURFACES[surface].accent;
  const logoTexture = useLogoTexture();
  const fabric = useFabricTexture(color);

  // Convert mm to scene units (100 mm = 1 unit) with a touch of exaggeration.
  const w = dims.widthMm / 100;
  const h = dims.heightMm / 100;
  const thickness = 0.14;
  const topY = thickness / 2;

  return (
    <group>
      {/* Pad body */}
      <RoundedBox
        args={[w, thickness, h]}
        radius={0.06}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={fabric}
          color="#ffffff"
          roughness={0.9}
          metalness={0.02}
        />
      </RoundedBox>

      {/* Raised stitched edge frame — subtly accent tinted */}
      <RoundedBox
        args={[w + 0.02, thickness + 0.02, h + 0.02]}
        radius={0.07}
        smoothness={6}
      >
        <meshStandardMaterial
          color="#050505"
          roughness={0.7}
          metalness={0.1}
          emissive={new THREE.Color(accent)}
          emissiveIntensity={surface === 'balance' ? 0.02 : 0.05}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </RoundedBox>

      <StitchOutline w={w} h={h} y={topY + 0.005} />

      {/* Brand logo — upper-right corner */}
      {logoTexture && (
        <mesh position={[w * 0.3, topY + 0.006, -h * 0.28]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w * 0.2, w * 0.2]} />
          <meshStandardMaterial
            map={logoTexture}
            transparent
            roughness={0.85}
            opacity={0.92}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
