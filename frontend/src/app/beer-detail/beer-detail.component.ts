import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Beer } from '../Beer';
import { BeerService } from '../services/beer.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {
  beer: Beer;
  id: string;
  brewery;
  saved: boolean;

  constructor(private beerService: BeerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.beerService.getBeer(this.id)
      .subscribe(beer => {
        this.beer = beer.data;
        this.brewery = beer.data.breweries[0];
        console.log(this.beer);
      });

    this.route.params.subscribe(params => this.id = params['id']);
  }

  save() {
    this.beerService.toggleSaveBeer(this.beer)
      .subscribe(() => this.saved = !this.saved);
  }

}
