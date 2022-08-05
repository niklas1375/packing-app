import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, map, Observable, firstValueFrom } from 'rxjs';
import { LoginReply } from '../types/login-reply';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  lastLoginReply!: LoginReply;

  constructor(private http: HttpClient) {}

  async login(): Promise<void> {
    if (!this.lastLoginReply) {
      this.lastLoginReply = await firstValueFrom(
        this.http
          .post<LoginReply>('/api/auth/login', {})
          .pipe(catchError(this.handleError<LoginReply>('login', undefined)))
      );
    }

    window.location.href = `https://todoist.com/oauth/authorize?client_id=${this.lastLoginReply.client_id}&scope=${this.lastLoginReply.scopes}&state=${this.lastLoginReply.state}`;
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.post<LoginReply>('/api/auth/login', {}).pipe(
      map((loginReply: LoginReply) => {
        this.lastLoginReply = loginReply;
        return loginReply.loggedIn;
      })
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
