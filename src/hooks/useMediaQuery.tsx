import { useEffect } from 'react';
import { useMediaQueryStore } from '@/stores/useMediaQueryStore';

export const useMediaQuery = (query: string) => {
  const { matches, setMatches  } = useMediaQueryStore();

  useEffect(() => {
    const media = window.matchMedia(query);

    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(media.matches);

    media.addEventListener("change", updateMatches);

    return () => media.removeEventListener("change", updateMatches);
  }, [query, setMatches]);

  return matches;
};