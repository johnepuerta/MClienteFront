import { ClienteCadastroComponent } from './cliente-cadastro.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ClienteCadastroComponent],
  exports: [ClienteCadastroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
    ClienteCadastroComponent
  ],
})
export class ClienteCadastroModule { }
