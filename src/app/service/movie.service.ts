import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = "https://getmovie-a5i6.onrender.com/api/movies"

  constructor(private http:HttpClient) { }

  getMovies(page: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      map(response => ({
        movies: response.movies,
        totalItems: response.totalItems
      }))
    );
  }

  searchMovies(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('title', searchTerm);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
}
