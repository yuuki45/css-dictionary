import { useLocalStorage } from './useLocalStorage';
import { RecentProperty } from '../types/css';

const MAX_RECENT_ITEMS = 10;

export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage<RecentProperty[]>('css-dictionary-recent', []);

  const addRecentlyViewed = (propertyId: string) => {
    setRecent(prev => {
      const filtered = prev.filter(item => item.id !== propertyId);
      const newRecent = [{ id: propertyId, viewedAt: Date.now() }, ...filtered];
      return newRecent.slice(0, MAX_RECENT_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecent([]);
  };

  const getRecentIds = (limit = 5) => {
    return recent.slice(0, limit).map(item => item.id);
  };

  return {
    recent,
    addRecentlyViewed,
    clearRecentlyViewed,
    getRecentIds
  };
}