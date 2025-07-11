import { useLocalStorage } from './useLocalStorage';
import { FavoriteProperty } from '../types/css';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteProperty[]>('css-dictionary-favorites', []);

  const addFavorite = (propertyId: string) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === propertyId)) {
        return prev;
      }
      return [...prev, { id: propertyId, addedAt: Date.now() }];
    });
  };

  const removeFavorite = (propertyId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  const getFavoriteIds = () => {
    return favorites.sort((a, b) => b.addedAt - a.addedAt).map(fav => fav.id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteIds
  };
}