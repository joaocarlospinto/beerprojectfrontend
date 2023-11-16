import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { BeerModule } from './beers/beer.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RatingModule } from 'ngx-bootstrap/rating';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
            { path: 'about', component: AboutComponent},
      { path: '', redirectTo: 'about', pathMatch: 'full'},
      { path: '**', redirectTo: 'about', pathMatch: 'full'}
    ]),
    BeerModule,
    ButtonsModule.forRoot(),
    RatingModule.forRoot()  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
