import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { baseUrl } from './../shared/baseUrl';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(route: string, data) {
    const url = `${baseUrl}/${route}`;

    return this.http.post(url, data).pipe(
      tap(_ => console.log(`Logging in`)),
      catchError(this.handleError)
    );
  }

  logout(route: string, data) {
    const url = `${baseUrl}/${route}`;

    return this.http.post(url, data).pipe(
      tap(_ => console.log(`Logging out`)),
      catchError(this.handleError)
    );
  }

  verifyIfUserHasToken() {
    const token = localStorage.getItem('token');

    if (token !== null) {
      return true;
    } else {
      return;
    }
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
