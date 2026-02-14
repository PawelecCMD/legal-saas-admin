import { useEffect, useRef } from 'react';

/**
 * Hook to automatically save form data to localStorage
 * @param key The unique key to store the data under
 * @param data The form data object to save
 * @param delay Throttle delay in ms (default: 1000)
 */
export function useAutoSave<T>(key: string, data: T, delay: number = 1000) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            if (data && Object.keys(data as object).length > 0) {
                localStorage.setItem(`draft_${key}`, JSON.stringify(data));
                console.log(`Draft saved for ${key}`);
            }
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [key, data, delay]);

    const getDraft = (): T | null => {
        const saved = localStorage.getItem(`draft_${key}`);
        if (saved) {
            try {
                return JSON.parse(saved) as T;
            } catch (e) {
                console.error('Error parsing draft:', e);
                return null;
            }
        }
        return null;
    };

    const clearDraft = () => {
        localStorage.removeItem(`draft_${key}`);
    };

    return { getDraft, clearDraft };
}
