import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IBeer } from "./beer";

@Injectable({
  providedIn: 'root'
})
export class BeerService {

private beerUrl = 'https://beer-project-api.onrender.com/beersapi';
// private beerUrl = 'http://localhost:8080/beersapi';
  private countryUrl = 'assets/countries.json';

  constructor(private http: HttpClient) { }

  getBeers(): Observable<IBeer[]> {
    return this.http.get<IBeer[]>(this.beerUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBeer(id: number): Observable<IBeer> {
    return this.http.get<IBeer>(`${this.beerUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  postBeerForm(beer: IBeer): Observable<any> {
    return this.http.post(this.beerUrl, beer)
      .pipe(catchError(this.handleError));
  }

  putBeerForm(beer: IBeer, id: number): Observable<IBeer> {    
    return this.http.put<IBeer>(`${this.beerUrl}/${id}`, beer)
      .pipe(catchError(this.handleError));
  }

  delBeer(id: number) {
    return this.http
      .delete(`${this.beerUrl}/${id}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}