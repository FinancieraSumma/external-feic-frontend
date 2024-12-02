import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { fromRegistration: boolean };

    if (state?.fromRegistration) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}