import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { FavoriteProperty } from '../types/css';

export function useFavorites() {
  const [favorites, setFavorites, isLoaded] = useLocalStorage<FavoriteProperty[]>('css-dictionary-favorites', []);

  const addFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === propertyId)) {
        return prev;
      }
      return [...prev, { id: propertyId, addedAt: Date.now() }];
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== propertyId));
  }, [setFavorites]);

  const isFavorite = useCallback((propertyId: string) => {
    return favorites.some(fav => fav.id === propertyId);
  }, [favorites]);

  const getFavoriteIds = useCallback(() => {
    return favorites.sort((a, b) => b.addedAt - a.addedAt).map(fav => fav.id);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteIds,
    isLoaded
  };
}