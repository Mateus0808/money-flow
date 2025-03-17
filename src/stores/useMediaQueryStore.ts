import { create } from 'zustand';

interface MediaQueryStore {
  matches: boolean;
  setMatches: (matches: boolean) => void;
}

export const useMediaQueryStore = create<MediaQueryStore>((set) => ({
  matches: window.matchMedia("(max-width: 768px)").matches,
  setMatches: (matches) => set({ matches }),
}))