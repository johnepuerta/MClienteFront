import { InterceptorService } from './core/InterceptorService';
import { AuthGuard } from './core/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoNegadoModule } from './acesso-negado/acesso-negado.module';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatGridListModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AcessoNegadoModule,
    LoginModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AuthGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
