import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBeer } from './beer';
import { BeerService } from './beer.service';
import { NgForm, NgModel } from '@angular/forms';
import { countries } from './country-data-store';

@Component({
  templateUrl: './upt-beer.component.html',
  styleUrls: ['./upt-beer.component.css']
})

export class UptBeerComponent implements OnInit {
  pageTitle = 'Update Beer';
  errorMessage = '';
  postError = false;
  beerUpdated = false;
  postErrorMessage = '';
  beer!: IBeer;
  beerUpd!: IBeer;
  id!: number;

  public countries: any = countries;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private beerService: BeerService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getBeer(this.id);
    }
  }

  getBeer(id: number): void {
    this.beerService.getBeer(id).subscribe({
      next: beer => { this.beer = beer; console.log("BEER ID: " + beer.id); },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/beers']);
  }

  onHttpError(errorResponse: any) {
    this.postError = true;
    this.postErrorMessage = errorResponse;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      form.value.name = form.value.name.toUpperCase();
      form.value.type = form.value.type.toUpperCase();
      this.beerService.putBeerForm(form.value, this.id).subscribe({
        next: result => {
          this.beerUpdated = true;
          this.postError = false;
        },
        error: err => this.onHttpError(err)
      });
    }
    else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors"
    }
  }


}