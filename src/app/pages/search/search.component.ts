import { Component, OnInit } from '@angular/core';
import { Movie } from '../favorites/favorites.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from 'src/app/service/favorite.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})



export class SearchComponent implements OnInit{

  searchTerm: string = '';
  searchResults: any[] = [];
  searchInitiated: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient,private favoriteService:FavoriteService) {
    this.searchResults=[];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['title'] || '';
      if (this.searchTerm) {
        this.searchMovies();
      }
    });
  }
  

  searchMovies(): void {
    this.searchInitiated = true;
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.http.get<any>(`https://getmovies-render.onrender.com/api/movies/search?title=${this.searchTerm}`)
      .subscribe(
        (response) => {
          this.searchResults = response;
          console.log('result is:',this.searchResults)
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching search results', error);
          this.searchResults = [];
          this.errorMessage = `Error: ${error.message}`;
        }
      );
  }
  addToFavorite(movie: Movie): void {
    this.favoriteService.addToFavorite(movie);
  }

}


