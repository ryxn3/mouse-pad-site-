'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Builds the woven-strap texture for the keychain: a black nylon webbing with
 * a jacquard-style "PEGARIS" wordmark running along its length and a thin
 * crimson centre stripe — matching the real product.
 */
export function useStrapTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const w = 512;
    const h = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // Base nylon black
    ctx.fillStyle = '#0b0b0b';
    ctx.fillRect(0, 0, w, h);

    // Subtle horizontal weave ribbing
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 2;
    for (let y = 0; y < h; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Crimson centre stripe (slightly off-centre, like the reference)
    ctx.fillStyle = 'rgba(176,0,32,0.9)';
    ctx.fillRect(w * 0.55 - 3, 0, 6, h);

    // Woven wordmark running along the strap
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#efefef';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 300px "Arial Narrow", Arial, sans-serif';
    // Emulate a woven look with a faint double-print
    ctx.globalAlpha = 0.95;
    ctx.fillText('PEGARIS', 0, -10);
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#000';
    ctx.fillText('PEGARIS', 3, -7);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);
}
