import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface CardDebugStore {
  showDebug: boolean;
  showCardOverlay: boolean;
  setShowCardOverlay: (showCardOverlay: boolean) => void;
  overlayOpacity: number;
  setOverlayOpacity: (overlayOpacity: number) => void;
  overlayImgSrc?: string;
  setOverlayImgSrc: (overlayImgSrc: string | undefined) => void;
  prevolveImgSrc?: string;
  setPrevolveImgSrc: (prevolveImgSrc: string | undefined) => void;
}

export const useCardDebugStore = create<CardDebugStore>()(
  persist(
    set => ({
      showDebug: process.env.NODE_ENV === 'development',
      showCardOverlay: true,
      setShowCardOverlay: showCardOverlay => set({ showCardOverlay }),
      overlayOpacity: 50,
      setOverlayOpacity: overlayOpacity => set({ overlayOpacity }),
      overlayImgSrc:
        'https://i0.wp.com/pkmncards.com/wp-content/uploads/sv1_en_160.jpg?fit=734%2C1024&ssl=1',
      setOverlayImgSrc: overlayImgSrc => set({ overlayImgSrc }),
      prevolveImgSrc:
        'https://www.formica.com/nl-nl/-/media/formica/emea/products/swatch-images/f2253/f2253-swatch.jpg?rev=1604f0e24cab4299a2a076307dd98ccd',
      setPrevolveImgSrc: prevolveImgSrc => set({ prevolveImgSrc }),
    }),
    {
      name: 'cardDebug',
    },
  ),
);
