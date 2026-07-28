'use client';

import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { withBasePath } from '@/lib/basePath';

/**
 * Builds the arm-sleeve fabric texture: matte-black compression knit with a
 * tonal PEGARIS wordmark, the Pegasus mark, diagonal speed lines near the
 * elbow, and stitched silicone cuffs. `u` wraps the circumference, `v` runs
 * the length (v=0 at the bicep, v=1 at the wrist).
 */
export function useArmSleeveTexture(): THREE.CanvasTexture {
  const { texture, canvas, ctx } = useMemo(() => {
    const W = 1024;
    const H = 1600;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const x = c.getContext('2d')!;

    // Base knit
    x.fillStyle = '#0b0b0b';
    x.fillRect(0, 0, W, H);

    // Subtle vertical knit ribbing
    x.strokeStyle = 'rgba(255,255,255,0.02)';
    x.lineWidth = 1.5;
    for (let u = 0; u < W; u += 5) {
      x.beginPath();
      x.moveTo(u, 0);
      x.lineTo(u, H);
      x.stroke();
    }

    // Silicone cuff bands + stitch lines (top & bottom)
    x.fillStyle = '#050505';
    x.fillRect(0, 0, W, H * 0.04);
    x.fillRect(0, H * 0.96, W, H * 0.04);
    x.strokeStyle = 'rgba(255,255,255,0.06)';
    x.setLineDash([8, 6]);
    x.lineWidth = 2;
    for (const yy of [H * 0.045, H * 0.955]) {
      x.beginPath();
      x.moveTo(0, yy);
      x.lineTo(W, yy);
      x.stroke();
    }
    x.setLineDash([]);

    // Diagonal speed lines near the elbow (front panel)
    x.save();
    x.beginPath();
    x.rect(W * 0.3, H * 0.08, W * 0.6, H * 0.28);
    x.clip();
    x.strokeStyle = '#272727';
    for (let i = 0; i < 22; i++) {
      const off = i * 22;
      x.lineWidth = 3 + (i % 3);
      x.beginPath();
      x.moveTo(W * 0.32 + off, H * 0.36);
      x.lineTo(W * 0.32 + off + H * 0.24, H * 0.08);
      x.stroke();
    }
    x.restore();

    // PEGARIS wordmark running along the forearm
    x.save();
    x.translate(W * 0.5, H * 0.56);
    x.rotate(-Math.PI / 2);
    x.fillStyle = '#363636';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.font = '700 92px "Arial Narrow", Arial, sans-serif';
    x.letterSpacing = '26px';
    x.fillText('PEGARIS', 0, 0);
    x.restore();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return { texture: tex, canvas: c, ctx: x };
  }, []);

  // Draw the Pegasus mark (tonal grey) once the logo asset loads.
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = withBasePath('/assets/logo-mark.png');
    img.onload = () => {
      const size = 210;
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;
      const octx = off.getContext('2d')!;
      octx.drawImage(img, 0, 0, size, size);
      // Recolour the white mark to a tonal grey.
      octx.globalCompositeOperation = 'source-in';
      octx.fillStyle = '#3d3d3d';
      octx.fillRect(0, 0, size, size);
      ctx.drawImage(off, canvas.width * 0.16, canvas.height * 0.1, size, size);
      texture.needsUpdate = true;
    };
  }, [texture, canvas, ctx]);

  return texture;
}
