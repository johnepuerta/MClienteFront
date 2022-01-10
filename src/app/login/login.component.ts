import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  error: any;

  
  constructor(private fb: FormBuilder,private router: Router) { }
  
  ngAfterViewInit(): void {
    
    if(sessionStorage.getItem('token')){
      this.router.navigate(['/clientes']);
    }

  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      usuario:  ['', [Validators.required]],
      senha:  ['', [Validators.required]],
    });

  }

  submit(){
    sessionStorage.setItem('token', btoa(this.formGroup.get('usuario').value+":"+this.formGroup.get('senha').value));
    if(this.formGroup.get('usuario').value === 'admin'){
      sessionStorage.setItem('roles', 'ADMIN');
    }else{
      sessionStorage.setItem('roles', 'USER');
    }
    this.router.navigate(['/clientes']);
  }

}
