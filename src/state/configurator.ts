'use client';

import { create } from 'zustand';
import type { SurfaceId, SizeId, ColorId } from '@/types';

interface ConfiguratorState {
  surface: SurfaceId;
  size: SizeId;
  color: ColorId;
  setSurface: (surface: SurfaceId) => void;
  setSize: (size: SizeId) => void;
  setColor: (color: ColorId) => void;
}

/** Shared product configuration used by the viewer, specs and buy box. */
export const useConfigurator = create<ConfiguratorState>((set) => ({
  surface: 'balance',
  size: 'm',
  color: 'black',
  setSurface: (surface) => set({ surface }),
  setSize: (size) => set({ size }),
  setColor: (color) => set({ color }),
}));
