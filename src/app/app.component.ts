import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginReply } from './types/login-reply';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'packing-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.login().subscribe((loginReply: LoginReply) => {
      if (loginReply.loggedIn) {
        return;
      } else {
        window.location.href = `https://todoist.com/oauth/authorize?client_id=${loginReply.client_id}&scope=${loginReply.scopes}&state=${loginReply.state}`;
      }
    });
  }
}
