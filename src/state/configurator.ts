'use client';

import { create } from 'zustand';
import type { SurfaceId, SizeId } from '@/types';

interface ConfiguratorState {
  surface: SurfaceId;
  size: SizeId;
  setSurface: (surface: SurfaceId) => void;
  setSize: (size: SizeId) => void;
}

/** Shared product configuration used by the viewer, specs and buy box. */
export const useConfigurator = create<ConfiguratorState>((set) => ({
  surface: 'balance',
  size: 'm',
  setSurface: (surface) => set({ surface }),
  setSize: (size) => set({ size }),
}));
