'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Build a CanvasTexture from the supplied logo asset for use on the 3D pad.
 *
 * The original artwork is black-on-cream. To reproduce the real product — a
 * white Pegasus on matte black cloth — we render the logo to a canvas at
 * display time: dark artwork pixels become opaque white, the light background
 * becomes transparent. The source file on disk is never altered.
 */
function buildLogoTexture(image: HTMLImageElement): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0, size, size);

  const data = ctx.getImageData(0, 0, size, size);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
    // Dark source pixels (the artwork) -> opaque; light background -> transparent.
    const alpha = Math.min(255, Math.max(0, (200 - lum) * 2));
    px[i] = 255;
    px[i + 1] = 255;
    px[i + 2] = 255;
    px[i + 3] = alpha;
  }
  ctx.putImageData(data, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/** React hook that lazily loads and processes the logo texture on the client. */
export function useLogoTexture(): THREE.CanvasTexture | null {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let disposed = false;
    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.src = '/assets/logo.png';
    image.onload = () => {
      if (!disposed) setTexture(buildLogoTexture(image));
    };
    return () => {
      disposed = true;
    };
  }, []);

  return texture;
}
