import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }  else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
