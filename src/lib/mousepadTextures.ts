'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { withBasePath } from '@/lib/basePath';
import type { ColorId } from '@/types';

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                     */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
function mix(hex: string, target: [number, number, number], t: number): string {
  const [r, g, b] = hexToRgb(hex);
  const m = (a: number, c: number) => Math.round(a + (c - a) * t);
  return `rgb(${m(r, target[0])},${m(g, target[1])},${m(b, target[2])})`;
}
const lighten = (hex: string, t: number) => mix(hex, [255, 255, 255], t);
const darken = (hex: string, t: number) => mix(hex, [0, 0, 0], t);

/** Vivid base colour for each patterned colourway. */
const PATTERN_BASE: Record<ColorId, string> = {
  black: '#1d1d1d',
  red: '#a5121f',
  royal: '#1c3ea8',
  purple: '#4a2494',
};

/* ------------------------------------------------------------------ */
/*  Procedural "Prism" geometric pattern                               */
/* ------------------------------------------------------------------ */

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Draws the sculpted geometric "Prism" surface — intersecting diagonal panels,
 * large soft arcs and a fine stripe field — tone-on-tone over the base colour,
 * filling the entire pad. Returns a ClampToEdge CanvasTexture (maps once).
 */
function makePatternTexture(color: ColorId): THREE.CanvasTexture {
  const base = PATTERN_BASE[color];
  const W = 1200;
  const H = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // Large soft arcs
  ctx.save();
  ctx.beginPath();
  ctx.arc(W * 0.26, H * 0.78, H * 0.62, 0, Math.PI * 2);
  ctx.fillStyle = darken(base, 0.1);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W * 0.86, H * 0.26, H * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = lighten(base, 0.05);
  ctx.fill();
  ctx.restore();

  // Intersecting diagonal panels (the "X")
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-0.66);
  ctx.fillStyle = darken(base, 0.14);
  ctx.fillRect(-W, -H * 0.08, 2 * W, H * 0.16);
  ctx.rotate(1.32);
  ctx.fillStyle = lighten(base, 0.07);
  ctx.fillRect(-W, -H * 0.05, 2 * W, H * 0.1);
  ctx.restore();

  // Rectangular tonal panel
  ctx.fillStyle = lighten(base, 0.045);
  roundRectPath(ctx, W * 0.52, H * 0.12, W * 0.34, H * 0.4, 10);
  ctx.fill();

  // Fine stripe field (lower-right)
  ctx.save();
  ctx.beginPath();
  ctx.rect(W * 0.58, H * 0.5, W * 0.42, H * 0.5);
  ctx.clip();
  ctx.strokeStyle = darken(base, 0.16);
  ctx.lineWidth = 7;
  for (let x = -H; x < W; x += 26) {
    ctx.beginPath();
    ctx.moveTo(x, H);
    ctx.lineTo(x + H, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Bright sculpted edge lines along the diagonals
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.strokeStyle = lighten(base, 0.35);
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2.5;
  ctx.rotate(-0.66);
  ctx.beginPath();
  ctx.moveTo(-W, -H * 0.08);
  ctx.lineTo(W, -H * 0.08);
  ctx.stroke();
  ctx.rotate(1.32);
  ctx.beginPath();
  ctx.moveTo(-W, -H * 0.05);
  ctx.lineTo(W, -H * 0.05);
  ctx.stroke();
  ctx.restore();

  // Subtle woven grain
  const img = ctx.getImageData(0, 0, W, H);
  const px = img.data;
  for (let i = 0; i < px.length; i += 4) {
    const n = (Math.random() - 0.5) * 12;
    px[i] += n;
    px[i + 1] += n;
    px[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/* ------------------------------------------------------------------ */
/*  Procedural woven-cloth fallback                                    */
/* ------------------------------------------------------------------ */

function makeProceduralWeave(color: ColorId): THREE.CanvasTexture {
  const base =
    color === 'black'
      ? '#101010'
      : color === 'red'
        ? '#3a0710'
        : color === 'royal'
          ? '#0b1740'
          : '#1b0d38';
  const s = 512;
  const canvas = document.createElement('canvas');
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, s, s);
  const img = ctx.getImageData(0, 0, s, s);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = 8 + Math.random() * 14;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

/**
 * Returns the pad surface texture for the selected colourway. Patterned
 * products get the procedurally-drawn geometric design (mapped once);
 * woven products load the real cloth photo, tiled, with a procedural fallback.
 */
export function useSurfaceTexture(color: ColorId, patterned: boolean): THREE.Texture {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;

    if (patterned) {
      setTexture(makePatternTexture(color));
      return () => {
        active = false;
      };
    }

    // Woven: procedural fallback first, then the real photo when it loads.
    setTexture(makeProceduralWeave(color));
    new THREE.TextureLoader().load(withBasePath(`/textures/cloth-${color}.png`), (tex) => {
      if (!active) return;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.anisotropy = 8;
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });

    return () => {
      active = false;
    };
  }, [color, patterned]);

  return texture ?? makeProceduralWeave(color);
}
