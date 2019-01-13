import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { Beer } from '../Beer';

const abvs = [
  { label: 'Less than 4%', value: '-3' },
  { label: '4% - 6%', value: '4,6' },
  { label: '7% - 9%', value: '7,9' },
  { label: '10% - 12%', value: '10,12' },
  { label: 'More than 12%', value: '+12' },
];

const ibus = [
  { label: 'Light', value: '0,10' },
  { label: 'A Little Bitter', value: '11,20' },
  { label: 'Average', value: '20,50' },
  { label: 'Bitter', value: '51,80' },
  { label: 'Very Bitter', value: '+81' },
];

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
  beers: Array<Beer>;
  abvs = abvs;
  ibus = ibus;
  selectedAbv = '0,25';
  selectedIbu = '0,100';
  filters;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerService.getBeers(this.filters)
      .subscribe(data => {
        this.beers = data.data;
      });
  }

  refetchBeers() {
    this.filters = {
      abv: this.selectedAbv,
      ibu: this.selectedIbu,
    };

    this.beerService.getBeers(this.filters)
      .subscribe(data => this.beers = data.data);
  }

}
