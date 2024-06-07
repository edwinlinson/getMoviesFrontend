import { Injectable } from '@angular/core';
import { Movie } from '../pages/favorites/favorites.component';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  addToFavorite(movie: Movie): void {
    let favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!this.isMovieInFavorites(movie)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`Added "${movie.title}" to favorites!`);
    } else {
      alert(`"${movie.title}" is already in your favorites.`);
    }
  }

  isMovieInFavorites(movie: Movie): boolean {
    let favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(favorite => favorite.id === movie.id);
  }

  getFavorites(): Movie[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}
