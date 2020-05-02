import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { baseUrl } from './../shared/baseUrl';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getData (route: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl + route}`)
      .pipe(
        tap(data => console.log('fetched data from server')),
        catchError(this.handleError)
      );
  }

  getSpecificData(id: string, route: string): Observable<any> {
    return this.http.get(`${baseUrl}${route}/${id}`).pipe(
      tap((data: any) => console.log('data with selected id returned')),
      catchError(this.handleError)
    );
  }

  getSpecificDataWithFilter(id: string, route: string, filter: string): Observable<any> {
    return this.http.get(`${baseUrl}${route}/${id}/${filter}`).pipe(
      tap((data: any) => console.log('data with selected id returned')),
      catchError(this.handleError)
    );
  }
  
  addData (data, route:string): Observable<any> {
    return this.http.post<any>(baseUrl + route, data, httpOptions).pipe(
      tap((data: any) => console.log(`added product w/ id=${data.id}`)),
      catchError(this.handleError)
    );
  }

  uploadImage (data, route:string): Observable<any> {
    return this.http.post<any>(baseUrl + route, data).pipe(
      tap((data: any) => console.log(`added product w/ id=${data.id}`)),
      catchError(this.handleError)
    );
  }
  
  updateData (id, data, route: string): Observable<any> {
    const url = `${baseUrl}${route}/${id}`;
    return this.http.patch(url, data, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError)
    );
  }
  
  deleteData (route: string, id): Observable<any> {
    const url = `${baseUrl}/${route}/${id}`;
  
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted data id=${id}`)),
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