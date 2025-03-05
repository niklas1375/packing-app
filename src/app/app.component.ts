import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'packing-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loginReply) => {
      if (loginReply.loggedIn) {
        return;
      } else {
        window.location.href = `https://todoist.com/oauth/authorize?client_id=${loginReply.client_id}&scope=${loginReply.scopes}&state=${loginReply.state}`;
      }
    });
  }
}
