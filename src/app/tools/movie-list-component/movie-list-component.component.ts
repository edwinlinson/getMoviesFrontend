import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'ngx-pagination';
import { MovieService } from 'src/app/service/movie.service';

export interface Movie {
  id:number;
  banner_image: string;
  title: string;
  release_year: number;
  genre: string;
}

@Component({
  selector: 'app-movie-list-component',
  templateUrl: './movie-list-component.component.html',
  styleUrls: ['./movie-list-component.component.css']
})


export class MovieListComponentComponent implements OnInit {

  constructor(private movieService:MovieService,private paginationService: PaginationService){}
  

  movies: Movie[] = [];
  page = 1;
  pageSize = 10;
  totalItems = 0;

  ngOnInit(): void {
    this.loadMovies();
    this.paginationService.register({
      id: 'DEFAULT_PAGINATION_ID1',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.totalItems
    });
  }
  loadMovies(): void {
    this.movieService.getMovies(this.page, this.pageSize)
      .subscribe(response => {
        this.movies = response.movies || [];
        this.totalItems = response.totalItems || 0;
        this.paginationService.setTotalItems('DEFAULT_PAGINATION_ID1', this.totalItems); 
        this.paginationService.setCurrentPage('DEFAULT_PAGINATION_ID1', this.page);
        console.log('Current page in service:', this.paginationService.getCurrentPage);
        console.log('Response from backend:', response);
        console.log('page no. :', this.page);
      },error => {
        console.error('Error oading ',error);
        this.page = 1;
        console.log('page no. :', this.page);
      });
  }

  onPageChange(pageNumber: number): void {
    console.log('Page change requested:', pageNumber); 
    this.page = pageNumber;
    console.log('Current page before loading movies:', this.page); 
    this.loadMovies();
  }
  
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
    return favorites.some(fav => fav.id === movie.id);
  }
}
