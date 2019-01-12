import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeerListComponent } from './beer-list/beer-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'beer/:id', component: BeerDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
