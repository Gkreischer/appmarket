import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { baseUrl } from './../shared/baseUrl';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getData(route: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl + route}`)
      .pipe(
        tap(data => console.log('fetched data from server')),
        catchError(this.handleError)
      );
  }

  getSpecificData(route: string, property: string, value: string): Observable<any> {
    return this.http.get<any>(`${baseUrl + route}?filter[where][${property}]=${value}`)
    .pipe(
      tap(data => console.log('fetched specific data from server')),
      catchError(this.handleError)
    );
  }

  getSpecificDataWithTwoOptions(route: string, property1: string, property2: string , value1: string, value2: string): Observable<any> {
    return this.http.get<any>(`${baseUrl + route}?filter[where][${property1}]=${value1}&filter[where][${property2}]=${value2}`)
    .pipe(
      tap(data => console.log('fetched specific data from server')),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error.error.message)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error.error.message);
  };
}
