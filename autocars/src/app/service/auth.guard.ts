import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
if (this.authService.isAuthenticated()) {
// User is authenticated, allow access to the route
return true;
} else {
// User is not authenticated, redirect to login page with return URL
this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
return false;
}
}
}