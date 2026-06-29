import { createContext, useContext, type ReactNode } from 'react';

export interface ZoomState {
  title: string;
  subtitle?: string;
  node: ReactNode;
  /** scale-множитель transform — default 2. для иконок ставим 6 */
  scale?: number;
}

export type OpenZoom = (z: ZoomState) => void;

export const ZoomContext = createContext<OpenZoom | null>(null);

export function useZoom(): OpenZoom | null {
  return useContext(ZoomContext);
}
