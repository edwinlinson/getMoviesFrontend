import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'ngx-pagination';
export interface Movie {
  id: number;
  banner_image: string;
  title: string;
  release_year: number;
  genre: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  favorites: Movie[] = [];
  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.loadFavorites();
    this.paginationService.register({
      id: 'DEFAULT_PAGINATION_ID1',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.totalItems
    });
  }

  loadFavorites(): void {
    let favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.totalItems = favorites.length;
    this.favorites = favorites.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    this.paginationService.setTotalItems('DEFAULT_PAGINATION_ID1', this.totalItems);
    this.paginationService.setCurrentPage('DEFAULT_PAGINATION_ID1', this.page);
  }

  onPageChange(pageNumber: number): void {
    this.page = pageNumber;
    this.loadFavorites();
  }

  removeFromFavorites(movie: Movie): void {
    let favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(fav => fav.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.loadFavorites();
  }
}