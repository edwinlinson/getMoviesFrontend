import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Get Movies';
  searchTerm: string = '';

  constructor(private router:Router,private movieService:MovieService){}
  navigateToSearch(): void {
    this.router.navigate(['/search'], { queryParams: { title: this.searchTerm } });
  }

  searchMovies(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { title: this.searchTerm } });
      this.movieService.searchMovies(this.searchTerm).subscribe(response => {
        console.log('Search results:', response);
      }, error => {
        console.error('Error searching movies:', error);
      });
    }
  } 
}