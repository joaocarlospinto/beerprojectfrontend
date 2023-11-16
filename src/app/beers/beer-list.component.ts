import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IBeer } from './beer';
import { BeerService } from './beer.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})

export class BeerListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Beer List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  sub2!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBeers = this.performFilter(value);
  }

  filteredBeers: IBeer[] = [];

  beers: IBeer[] = [];

  topBeers: IBeer[] = [];
  topBeer1: IBeer | undefined;
  topBeer2: IBeer | undefined;
  topBeer3: IBeer | undefined;

  constructor(
    private router: Router,
    private beerService: BeerService) { }

  performFilter(filteredBy: string): IBeer[] {
    filteredBy = filteredBy.toLocaleLowerCase();
    return this.beers.filter((beer: IBeer) =>
      beer.name.toLocaleLowerCase().includes(filteredBy));
  }
 

  ngOnInit(): void {
    this.sub = this.beerService.getBeers().subscribe({
      next: beers => {
        this.beers = beers;
        this.filteredBeers = this.beers;
        this.topBeers = _.cloneDeep(this.beers);
        this.topBeers.sort((a,b) => {
          const result = a.rating - b.rating;
          return result * -1;
        }); 
        this.topBeer1 = this.topBeers[0];
        this.topBeer2 = this.topBeers[1];
        this.topBeer3 = this.topBeers[2];
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd(): void {
    this.router.navigate(['/addbeer']);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Beer List ' + message;
  }
}