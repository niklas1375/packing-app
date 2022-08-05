import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SummaryGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!history.state?.data) {
      this.router.navigate(['']);
      return false;
    }
    console.log("here?")
    return true;
  }
}
