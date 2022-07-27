import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ValueHelpItem } from '../types/value-help-item';
import { catchError, Observable, of } from 'rxjs';
import { UserChoice } from '../types/user-choice';
import { PackingList } from '../types/packing-list';

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

  compilePackingList(userChoices: UserChoice): Observable<PackingList> {
    return this.http
      .post<PackingList>(this.BASE_PATH + '/compile', userChoices)
      .pipe(
        catchError(
          this.handleError<PackingList>('compile packing list', undefined)
        )
      );
  }

  submitTodoistList(
    packinglist: PackingList,
    tripname: string,
    tripstart: string,
    tripend: string
  ) {
    const tripstartDate = new Date(tripstart).getTime();
    const tripendDate = new Date(tripend).getTime();
    const diffDays = Math.round(
      Math.abs(((tripstartDate - tripendDate) / 24) * 60 * 60 * 1000)
    );

    return this.http
      .post<string>(this.BASE_PATH + '/submitTasks', {
        tripName: tripname,
        tripLength: diffDays,
        tripBeginDate: tripstart,
        packingList: packinglist,
      })
      .pipe(
        catchError(this.handleError<string>('submit tasks to Todoist', ''))
      );
  }

  private _getValueHelp(path: string): Observable<ValueHelpItem[]> {
    return this.http
      .get<ValueHelpItem[]>(this.BASE_PATH + path)
      .pipe(catchError(this.handleError<ValueHelpItem[]>(`get ${path}`, [])));
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
