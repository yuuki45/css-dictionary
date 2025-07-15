import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { RecentProperty } from '../types/css';

const MAX_RECENT_ITEMS = 10;

export function useRecentlyViewed() {
  const [recent, setRecent, isLoaded] = useLocalStorage<RecentProperty[]>('css-dictionary-recent', []);

  const addRecentlyViewed = useCallback((propertyId: string) => {
    setRecent(prev => {
      const filtered = prev.filter(item => item.id !== propertyId);
      const newRecent = [{ id: propertyId, viewedAt: Date.now() }, ...filtered];
      return newRecent.slice(0, MAX_RECENT_ITEMS);
    });
  }, [setRecent]);

  const clearRecentlyViewed = useCallback(() => {
    setRecent([]);
  }, [setRecent]);

  const getRecentIds = useCallback((limit = 5) => {
    return recent.slice(0, limit).map(item => item.id);
  }, [recent]);

  return {
    recent,
    addRecentlyViewed,
    clearRecentlyViewed,
    getRecentIds,
    isLoaded
  };
}