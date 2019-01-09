import { AppUser } from './../models/app-user';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
}
