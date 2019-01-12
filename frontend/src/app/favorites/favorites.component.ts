import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  beers: Array<any> = [];

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerService.getSavedBeers()
      .subscribe(data => this.beers = data);
  }

}
