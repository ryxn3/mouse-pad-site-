'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useLogoTexture } from '@/lib/logoTexture';

interface WristRestProps {
  /** Length in millimetres (from the selected keyboard size). */
  widthMm: number;
}

/** A rounded-rectangle footprint shape centred on the origin (XY plane). */
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

/** Simple black woven-cloth texture for the padded top. */
function makeClothTexture(): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0c0c0c';
  ctx.fillRect(0, 0, s, s);
  const img = ctx.getImageData(0, 0, s, s);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = 7 + Math.random() * 12;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/**
 * A memory-foam wrist rest — a long, low bar with softly rounded top edges and
 * a woven cloth top, whose length follows the selected keyboard form factor.
 * 1 unit ≈ 100 mm; centred on the origin, lying flat (Y up).
 */
export function WristRest({ widthMm }: WristRestProps) {
  const logoTexture = useLogoTexture();
  const cloth = useMemo(() => {
    const t = makeClothTexture();
    t.repeat.set(6, 1.4);
    return t;
  }, []);

  const L = widthMm / 100;
  const D = 0.9;
  const H = 0.24;
  const cornerR = 0.13;
  const topY = H / 2;

  const shape = useMemo(() => roundedRectShape(L, D, cornerR), [L]);

  const bodyGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: H,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 5,
      curveSegments: 32,
      steps: 1,
    });
    geo.translate(0, 0, -H / 2 - 0.06);
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, [shape]);

  const topGeo = useMemo(() => {
    const geo = new THREE.ShapeGeometry(shape, 48);
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

  const beadGeo = useMemo(() => {
    const pts = shape.getPoints(200).map((p) => new THREE.Vector3(p.x, topY, -p.y));
    const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.1);
    return new THREE.TubeGeometry(curve, 360, 0.022, 8, true);
  }, [shape, topY]);

  return (
    <group>
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#070707" roughness={0.9} metalness={0.03} />
      </mesh>

      <mesh geometry={topGeo} position={[0, topY + 0.002, 0]} receiveShadow>
        <meshStandardMaterial
          map={cloth}
          color="#ffffff"
          roughness={0.92}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh geometry={beadGeo}>
        <meshStandardMaterial color="#050505" roughness={0.5} metalness={0.15} />
      </mesh>

      {/* Brand mark near the right end (matching the product) */}
      {logoTexture && (
        <mesh position={[L * 0.34, topY + 0.006, D * 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshStandardMaterial
            map={logoTexture}
            transparent
            opacity={0.85}
            roughness={0.8}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
