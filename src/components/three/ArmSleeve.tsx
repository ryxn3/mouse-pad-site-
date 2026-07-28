'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useArmSleeveTexture } from '@/lib/armSleeveTexture';

/**
 * A tapered, gently curved compression arm sleeve — wide at the bicep,
 * narrowing to the wrist, with a slight elbow bulge — matching the reference.
 * Built by lofting rings of varying radius along a curved spine so the fabric
 * texture (wordmark, mark, speed lines) wraps naturally around it.
 */
export function ArmSleeve() {
  const fabric = useArmSleeveTexture();

  const geometry = useMemo(() => {
    const spine = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.0, 2.5, 0.0),
        new THREE.Vector3(-0.12, 1.25, 0.04),
        new THREE.Vector3(-0.05, 0.0, 0.06),
        new THREE.Vector3(0.32, -1.25, 0.03),
        new THREE.Vector3(0.62, -2.5, -0.03),
      ],
      false,
      'catmullrom',
      0.5,
    );

    const segs = 160;
    const radial = 64;
    const frames = spine.computeFrenetFrames(segs, false);

    const radiusAt = (t: number) => {
      // Bicep (0.62) tapering to wrist (0.34) with a soft elbow bulge.
      const base = 0.62 + (0.34 - 0.62) * (t * t * (3 - 2 * t));
      const bulge = 0.05 * Math.exp(-(((t - 0.34) / 0.18) ** 2));
      return base + bulge;
    };

    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const p = spine.getPointAt(t);
      const N = frames.normals[i];
      const B = frames.binormals[i];
      const r = radiusAt(t);
      for (let j = 0; j <= radial; j++) {
        const th = (j / radial) * Math.PI * 2;
        const cos = Math.cos(th);
        const sin = Math.sin(th);
        const dir = new THREE.Vector3()
          .addScaledVector(N, cos)
          .addScaledVector(B, sin)
          .normalize();
        positions.push(p.x + dir.x * r, p.y + dir.y * r, p.z + dir.z * r);
        normals.push(dir.x, dir.y, dir.z);
        uvs.push(j / radial, t);
      }
    }

    const ring = radial + 1;
    for (let i = 0; i < segs; i++) {
      for (let j = 0; j < radial; j++) {
        const a = i * ring + j;
        const b = a + ring;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        map={fabric}
        color="#ffffff"
        roughness={0.86}
        metalness={0.03}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
