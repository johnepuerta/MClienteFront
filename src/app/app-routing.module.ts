import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
        data:{
          allowedRoles: ["USER", "ADMIN"],
        }
      },
    ]
  },
  {
    path: 'acessonegado',
    loadChildren: () => import('./acesso-negado/acesso-negado.module').then(m => m.AcessoNegadoModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
