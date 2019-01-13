import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailComponent } from './beer-detail.component';
import { BeerService } from '../services/beer.service';
import { MatProgressBarModule, MatIconModule, MatButtonModule, MatListModule, MatRadioModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { BeerListComponent } from '../beer-list/beer-list.component';
import { BeerListItemComponent } from '../beer-list-item/beer-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';

describe('BeerDetailComponent', () => {
  let component: BeerDetailComponent;
  let fixture: ComponentFixture<BeerDetailComponent>;
  let beerService: BeerService;
  let mockRoute: any = { snapshot: {}};


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeerDetailComponent,
        HomePageComponent,
        FavoritesComponent,
        BeerListComponent,
        BeerListItemComponent,
      ],
      imports: [
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        AppRoutingModule,
        MatListModule,
        MatRadioModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        BeerService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': 'RK9Po6'}}}
        }
      ]
    })
    .compileComponents();

    beerService = TestBed.get(BeerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an Observable', () => {
    const dummyBeer = {
      name: 'Ale 20'
    };

    beerService.getBeer('RK9Po6').subscribe(beer => {
      expect(beer.name).toEqual(dummyBeer.name);
    });

  });
});
