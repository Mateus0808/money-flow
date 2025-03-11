import { useEffect } from 'react';
import { create } from 'zustand';

interface MediaQueryStore {
  matches: boolean;
  query: string;
  setMatches: (matches: boolean) => void;
  setQuery: (query: string) => void;
}

export const useMediaQueryStore = create<MediaQueryStore>((set) => ({
  matches: false,
  query: "",
  setMatches: (matches) => set({ matches }),
  setQuery: (query) => set({ query }),
}))

export const useMediaQuery = (query: string) => {
  const { matches, setMatches, setQuery } = useMediaQueryStore();

  useEffect(() => {
    setQuery(query);

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    
    return () => window.removeEventListener('resize', listener);
  }, [matches, query, setMatches, setQuery]);

  return matches;
};