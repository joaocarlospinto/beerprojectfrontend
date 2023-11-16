import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBeer } from './beer';
import { BeerService } from './beer.service';

@Component({
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {
  pageTitle = 'Beer Detail';
  errorMessage = '';
  beer: IBeer | undefined;
  postError: boolean = false;
  beerDeleted: boolean = false;
  postErrorMessage: string = "";


  constructor(private route: ActivatedRoute,
              private router: Router,
              private beerService: BeerService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getBeer(id);
    }
  }

  getBeer(id: number): void {
    this.beerService.getBeer(id).subscribe({
      next: beer => this.beer = beer,
      error: err => this.errorMessage = err
    });
  }

  onHttpError(errorResponse: any) {
    this.postError = true;
    this.postErrorMessage = errorResponse;
  }

  delBeer(id: number): void {
    this.beerService.delBeer(id).subscribe({
      next: data => this.beerDeleted = true,
      error: (err: any) => this.onHttpError(err)
    });
  }

  onBack(): void {
    this.router.navigate(['/beers']);
  }
  
}
