import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Beer } from '../Beer';

const API_URL = `http://localhost:3000/api`;

@Injectable({
  providedIn: 'root'
})

export class BeerService {
  searchOptions: Array<any> = [];
  beers: Array<any> = [];
  savedBeers: Array<any> = [];

  constructor(private http: HttpClient) { }

  getBeers(parameters: any): Observable<any> {
    const params = new HttpParams({
      fromObject: parameters,
    });
    return this.http.get(API_URL + '/beers', { params });
  }

  getBeer(id: string): Observable<any> {
    return this.http.get(`${API_URL}/beer/${id}/?withBreweries=Y`);
  }

  filterByAbv(abvMin, abvMax): Observable<any> {
    return of(this.beers.filter(beer => abvMin <= parseFloat(beer.abv) && abvMax >= parseFloat(beer.abv)));
  }

  toggleSaveBeer(beer): Observable<any> {
    const savedBeerIds = this.savedBeers.map(b => b.id);

    if (savedBeerIds.includes(beer.id)) {
      this.savedBeers = this.loadBeers().filter(b => b.id !== beer.id);
    } else {
      this.savedBeers.push(beer);
    }

    localStorage.setItem('birra_saved_beers', JSON.stringify(this.savedBeers));
    return of(this.savedBeers);
  }

  loadBeers() {
    return JSON.parse(localStorage.getItem('birra_saved_beers'));
  }

  isBeerSaved(id: string): boolean {
    const savedBeerIds = this.savedBeers.map(b => b.id);
    return savedBeerIds.includes(id);
  }

  getSavedBeers(): Observable<any> {
    const savedBeers = JSON.parse(localStorage.getItem('birra_saved_beers'));
    this.savedBeers = savedBeers;
    return of(this.savedBeers);
  }
}
