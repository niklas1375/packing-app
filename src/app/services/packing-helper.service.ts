import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ValueHelpItem } from '../types/value-help-item';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackingHelperService {
  private BASE_PATH = '/api';
  constructor(private http: HttpClient) {}

  getAccomodations(): Observable<ValueHelpItem[]> {
    return this._getValueHelp('/accomodation');
  }

  getActivities(): Observable<ValueHelpItem[]> {
    return this._getValueHelp('/activities');
  }

  getTransports(): Observable<ValueHelpItem[]> {
    return this._getValueHelp('/transport');
  }

  getTripTypes(): Observable<ValueHelpItem[]> {
    return this._getValueHelp('/triptypes');
  }

  getWeathers(): Observable<ValueHelpItem[]> {
    return this._getValueHelp('/weather');
  }

  compilePackingList() {}

  submitTodoistList() {}

  private _getValueHelp(path: string): Observable<ValueHelpItem[]> {
    return this.http
      .get<ValueHelpItem[]>(this.BASE_PATH + path)
      .pipe(
        catchError(this.handleError<ValueHelpItem[]>('getAccomodations', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
