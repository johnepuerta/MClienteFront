import { Routes, RouterModule } from '@angular/router';
import { AcessoNegadoComponent } from './acesso-negado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AcessoNegadoComponent
  }
]

@NgModule({
  declarations: [AcessoNegadoComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AcessoNegadoModule { }
