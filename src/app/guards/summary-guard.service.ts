import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSelectionService } from '../services/user-selection.service';

@Injectable({
  providedIn: 'root',
})
export class SummaryGuardService  {
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
