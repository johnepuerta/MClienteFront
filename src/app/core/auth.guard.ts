import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isPermitido(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isPermitido(route, state);
  }

  isPermitido(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (this.authService.isAuthenticated()) {
      if(!this.authService.isAuthorized(route.data.allowedRoles)){
        this.router.navigate(['/acessonegado']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}