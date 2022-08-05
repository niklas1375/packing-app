import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        this.authService.login();
        return false;
      }
    }));
  }
}
