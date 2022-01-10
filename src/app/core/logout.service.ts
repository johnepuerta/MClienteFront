import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout() {
    debugger
    if (confirm("Deseja realmente sair do sistema?")) {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
