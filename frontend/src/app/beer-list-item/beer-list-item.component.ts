import { Component, OnInit, Input } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from '../Beer';

@Component({
  selector: 'app-beer-list-item',
  templateUrl: './beer-list-item.component.html',
  styleUrls: ['./beer-list-item.component.scss']
})
export class BeerListItemComponent implements OnInit {
  @Input() beer: Beer;
  saved: boolean;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.saved = this.beerService.isBeerSaved(this.beer.id);
  }

  save() {
    this.beerService.toggleSaveBeer(this.beer)
      .subscribe(() => this.saved = !this.saved);
  }

}
