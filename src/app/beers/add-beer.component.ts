import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBeer } from './beer';
import { BeerService } from './beer.service';
import { NgForm, NgModel } from '@angular/forms';
import { countries } from './country-data-store';

@Component({
  templateUrl: './add-beer.component.html',
  styleUrls: ['./add-beer.component.css']
})
export class AddBeerComponent implements OnInit {
  pageTitle = 'Add new Beer';
  errorMessage = '';
  postError = false;
  beerCreated = false;
  postErrorMessage = '';
  beer: IBeer | undefined;
  public countries: any = countries;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private beerService: BeerService) {
  }

  ngOnInit(): void {
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
      this.beerService.postBeerForm(form.value).subscribe({
        next: result => {
          this.beerCreated = true;
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