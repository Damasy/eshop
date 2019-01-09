import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.user$.pipe(
      map(user => {
        if (user) { return true; }
        console.log('access denied');
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
