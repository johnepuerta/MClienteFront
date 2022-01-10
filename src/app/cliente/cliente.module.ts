import { ClienteCadastroModule } from './cliente-cadastro/cliente-cadastro.module';
import { CpfPipe } from './../core/CPFPipe.pipe';
import { Routes, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { AuthGuard } from '../core/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
  }
]

@NgModule({
  declarations: [ClienteComponent, CpfPipe],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ClienteCadastroModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ClienteModule { }
