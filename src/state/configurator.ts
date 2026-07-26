'use client';

import { create } from 'zustand';
import type { SurfaceId, SizeId, ColorId, ProductId } from '@/types';

interface ConfiguratorState {
  product: ProductId;
  surface: SurfaceId;
  size: SizeId;
  color: ColorId;
  setProduct: (product: ProductId) => void;
  setSurface: (surface: SurfaceId) => void;
  setSize: (size: SizeId) => void;
  setColor: (color: ColorId) => void;
}

/** Shared product configuration used by the viewer, specs and buy box. */
export const useConfigurator = create<ConfiguratorState>((set) => ({
  product: 'pro',
  surface: 'balance',
  size: 'm',
  color: 'black',
  setProduct: (product) => set({ product }),
  setSurface: (surface) => set({ surface }),
  setSize: (size) => set({ size }),
  setColor: (color) => set({ color }),
}));
