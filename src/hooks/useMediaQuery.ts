import { useState, useEffect, useCallback } from 'react';

/**
 * Hook do wykrywania media queries
 * @param query - Media query string (np. '(max-width: 768px)')
 * @returns boolean - czy media query pasuje
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Sprawdź czy window jest dostępne (SSR safety)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Ustaw początkową wartość
    setMatches(mediaQuery.matches);

    // Handler dla zmian
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Dodaj listener (używamy addEventListener zamiast onchange dla lepszej kompatybilności)
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Predefiniowane breakpointy zgodne z Tailwind CSS
 * Mobile-first approach
 */
export const BREAKPOINTS = {
  xs: 375,   // iPhone SE
  sm: 640,   // Small tablets
  md: 768,   // Tablets
  lg: 1024,  // Laptops
  xl: 1280,  // Desktops
  '2xl': 1536, // Large screens
} as const;

/**
 * Hook do wykrywania czy urządzenie jest mobile (< 768px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

/**
 * Hook do wykrywania czy urządzenie jest tablet (768px - 1023px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`);
}

/**
 * Hook do wykrywania czy urządzenie jest desktop (>= 1024px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

/**
 * Hook do wykrywania czy urządzenie jest mobile lub tablet (< 1024px)
 */
export function useIsMobileOrTablet(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.lg - 1}px)`);
}

/**
 * Hook do wykrywania orientacji urządzenia
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  return isPortrait ? 'portrait' : 'landscape';
}

/**
 * Hook do wykrywania czy użytkownik preferuje reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Hook do wykrywania czy użytkownik preferuje dark mode
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/**
 * Hook do wykrywania czy urządzenie ma touch
 */
export function useHasTouch(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)');
}

/**
 * Hook do wykrywania czy urządzenie ma hover (mouse)
 */
export function useHasHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/**
 * Hook zwracający aktualny breakpoint
 */
export function useCurrentBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const isXs = useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px) and (max-width: ${BREAKPOINTS['2xl'] - 1}px)`);
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']}px)`);

  if (isXs) return 'xs';
  if (isSm) return 'sm';
  if (isMd) return 'md';
  if (isLg) return 'lg';
  if (isXl) return 'xl';
  if (is2xl) return '2xl';
  return 'lg'; // fallback
}

/**
 * Hook zwracający wymiary okna
 */
export function useWindowSize() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = useCallback(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, []);

    // Dodaj throttle dla performance
    let timeoutId: ReturnType<typeof setTimeout>;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return size;
}

/**
 * Hook do wykrywania czy element mieści się w viewport
 * @param ref - React ref do elementu
 * @param options - IntersectionObserver options
 */
export function useIsInViewport(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}

// Eksportuj wszystko jako default object
export default {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsMobileOrTablet,
  useOrientation,
  usePrefersReducedMotion,
  usePrefersDarkMode,
  useHasTouch,
  useHasHover,
  useCurrentBreakpoint,
  useWindowSize,
  useIsInViewport,
  BREAKPOINTS,
};
