import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSelectionService } from '../services/user-selection.service';

@Injectable({
  providedIn: 'root',
})
export class SummaryGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userSelectionService: UserSelectionService
  ) {}

  canActivate(): boolean {
    if (!this.userSelectionService.getUserChoice()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
