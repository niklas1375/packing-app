import { Injectable } from '@angular/core';
import { UserChoice } from '../types/user-choice';

@Injectable({
  providedIn: 'root',
})
export class UserSelectionService {
  private userChoice!: UserChoice;

  constructor() {}

  getUserChoice(): UserChoice | undefined {
    return this.userChoice;
  }

  setUserChoice(choice: UserChoice) {
    this.userChoice = choice;
  }
}
