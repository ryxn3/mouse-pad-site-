'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useLogoTexture } from '@/lib/logoTexture';
import { useSurfaceTexture } from '@/lib/mousepadTextures';
import { SIZES, SURFACES } from '@/lib/products';
import type { SizeId, SurfaceId, ColorId } from '@/types';

interface MousepadProps {
  size: SizeId;
  surface: SurfaceId;
  color: ColorId;
  texturePrefix?: 'cloth' | 'pattern';
  patterned?: boolean;
}

/** A rounded-rectangle shape centred on the origin (XY plane). */
function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
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

/**
 * The Pegaris mousepad — an extruded cloth pad with softly rounded corners, a
 * raised stitched border, a real (or procedurally-drawn) surface that covers
 * the entire top, and the brand mark in the upper-right corner.
 * 1 unit ≈ 100 mm; the pad is centred on the origin and lies flat (Y up).
 */
export function Mousepad({ size, surface, color, patterned = false }: MousepadProps) {
  const dims = SIZES[size];
  const accent = SURFACES[surface].accent;
  const logoTexture = useLogoTexture();
  const surfaceTex = useSurfaceTexture(color, patterned);

  const w = dims.widthMm / 100;
  const h = dims.heightMm / 100;
  const thickness = 0.09;
  const cornerR = 0.22;
  const topY = thickness / 2;

  const shape = useMemo(() => roundedRectShape(w, h, cornerR), [w, h]);

  // Solid pad body (rounded corners + slight edge bevel).
  const bodyGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.02,
      bevelSegments: 3,
      curveSegments: 48,
      steps: 1,
    });
    // Centre on Y=0 including the bevel cap so the textured top sits on top.
    geo.translate(0, 0, -thickness / 2 - 0.015);
    geo.rotateX(-Math.PI / 2); // lie flat: width→X, height→-Z, thickness→Y
    geo.computeVertexNormals();
    return geo;
  }, [shape]);

  // Flat top surface with clean 0–1 UVs so the texture covers the whole pad.
  const topGeo = useMemo(() => {
    const geo = new THREE.ShapeGeometry(shape, 64);
    geo.computeBoundingBox();
    const bb = geo.boundingBox!;
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    const dx = bb.max.x - bb.min.x;
    const dy = bb.max.y - bb.min.y;
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) - bb.min.x) / dx, (pos.getY(i) - bb.min.y) / dy);
    }
    uv.needsUpdate = true;
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [shape]);

  // Raised stitched-edge bead following the perimeter.
  const beadGeo = useMemo(() => {
    const pts = shape.getPoints(240).map((p) => new THREE.Vector3(p.x, topY, -p.y));
    const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.1);
    return new THREE.TubeGeometry(curve, 420, 0.03, 10, true);
  }, [shape, topY]);

  // Dashed stitch line just inside the bead.
  const stitch = useMemo(() => {
    const inset = roundedRectShape(w - 0.14, h - 0.14, Math.max(0.05, cornerR - 0.07));
    const pts = inset.getPoints(220).map((p) => new THREE.Vector3(p.x, topY + 0.028, -p.y));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineDashedMaterial({
      color: '#3a3a3a',
      dashSize: 0.05,
      gapSize: 0.035,
      transparent: true,
      opacity: 0.85,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    return line;
  }, [w, h, topY]);

  return (
    <group>
      {/* Body */}
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#070707" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* Textured top surface */}
      <mesh geometry={topGeo} position={[0, topY + 0.002, 0]} receiveShadow>
        <meshStandardMaterial
          map={surfaceTex}
          color="#ffffff"
          roughness={0.92}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Stitched edge bead */}
      <mesh geometry={beadGeo}>
        <meshStandardMaterial
          color="#050505"
          roughness={0.5}
          metalness={0.15}
          emissive={new THREE.Color(accent)}
          emissiveIntensity={surface === 'balance' ? 0.015 : 0.04}
        />
      </mesh>

      {/* Stitch line */}
      <primitive object={stitch} />

      {/* Brand mark, upper-right */}
      {logoTexture && (
        <mesh position={[w * 0.3, topY + 0.006, -h * 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w * 0.19, w * 0.19]} />
          <meshStandardMaterial
            map={logoTexture}
            transparent
            roughness={0.8}
            opacity={0.95}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
