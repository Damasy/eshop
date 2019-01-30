import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eshop';
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.auth.user$.subscribe(user => {
      if (!user) { return; }

      this.userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
  }
}
