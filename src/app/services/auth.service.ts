import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { LoginReply } from '../types/login-reply';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  lastLoginReply!: LoginReply;

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): Observable<LoginReply> {
    if (this.lastLoginReply && this.lastLoginReply.loggedIn) {
      return of(this.lastLoginReply);
    }
    return this.http.post<LoginReply>('/api/auth/login', {});
  }
}
