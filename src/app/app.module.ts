import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ImageSliderComponent } from './tools/image-slider/image-slider.component';
import { MovieListComponentComponent } from './tools/movie-list-component/movie-list-component.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './pages/search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ImageSliderComponent,
    MovieListComponentComponent,
    FavoritesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
