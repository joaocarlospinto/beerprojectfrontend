import { NgModule } from '@angular/core';
import { BeerListComponent } from './beer-list.component';
import { BeerDetailComponent } from './beer-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { BeerDetailGuard } from './beer-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { AddBeerComponent } from './add-beer.component';
import { UptBeerComponent } from './upt-beer.component';

@NgModule({
  declarations: [
    BeerListComponent,
    BeerDetailComponent,
    AddBeerComponent,
    UptBeerComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'beers', component: BeerListComponent},
      { path: 'addbeer', component: AddBeerComponent},
      { 
        path: 'uptbeer/:id', 
        canActivate:[BeerDetailGuard],
        component: UptBeerComponent
      },
      { 
        path: 'beers/:id', 
        canActivate:[BeerDetailGuard],
        component: BeerDetailComponent
      },
    ]),
    SharedModule
  ]
})
export class BeerModule { }
