import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  public isAuthenticated(): boolean { 
      return sessionStorage.getItem("token") != null
  }

  public isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    const rolesUser = sessionStorage.getItem('roles');

    if(rolesUser == null) {
      return false;
    }
    return this.temRole(allowedRoles, rolesUser.toString().split(','));
  }

  private temRole(rolesNecessarias : string[], rolesUser: string[]) : boolean  {

    return rolesUser.filter((role) => rolesNecessarias.includes(role) ).length > 0;

  }
  
}
