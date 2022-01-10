import { EmailDTO } from './../EmailDTO';
import { FoneDTO } from './../FoneDTO';
import { ClientesDTO } from '../ClienteDTO';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  endPoint = 'http://localhost:8080/clientes';
  formGroup: FormGroup;
  emails: FormArray;
  cliente: ClientesDTO;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ClienteCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      telefones: this.fb.array([]),
      emails: this.fb.array([]),
    });
    if (this.data.id > 0) {
      this.http.get(this.endPoint + `/${this.data.id}`)
        .pipe().subscribe(
          data => {
            this.cliente = data as ClientesDTO;
            this.preencheForm();
          },
          err => {
            alert(err);
          }
        );
    } else {
      this.addNewFone();
      this.addNewEmail();
    }

  }
  preencheForm() {
    this.formGroup.get('nome').setValue(this.cliente.nome);
    this.formGroup.get('cpf').setValue(this.cliente.cpf);
    this.formGroup.get('cep').setValue(this.cliente.cep);
    this.formGroup.get('logradouro').setValue(this.cliente.logradouro);
    this.formGroup.get('bairro').setValue(this.cliente.bairro);
    this.formGroup.get('cidade').setValue(this.cliente.cidade);
    this.formGroup.get('uf').setValue(this.cliente.uf);
    this.formGroup.get('complemento').setValue(this.cliente.complemento);

    this.cliente.telefones.forEach((fone: FoneDTO) => {
      const control = <FormArray>this.formGroup.controls['telefones'];
      control.push(this.createFoneValues(fone.tipo, fone.ddd, fone.numero));
    })

    this.cliente.emails.forEach((email: EmailDTO) => {
      const control = <FormArray>this.formGroup.controls['emails'];
      control.push(this.createEmailValues(email.email));
    })


  }

  public addNewFone(): void {
    const control = <FormArray>this.formGroup.controls['telefones'];
    control.push(this.createFone());
  }

  get emailsControl() {
    return (<FormArray>this.formGroup.get('emails')).controls;
  }

  get fonesControl() {
    return (<FormArray>this.formGroup.get('telefones')).controls;
  }

  public addNewEmail(): void {
    const control = <FormArray>this.formGroup.controls['emails'];
    control.push(this.createEmail());
  }


  createFone(): FormGroup {
    return this.createFoneValues('', '', '');
  }

  createFoneValues(tipo, ddd, numero): FormGroup {
    return this.fb.group({
      tipo: [tipo, Validators.required],
      ddd: [ddd, Validators.required],
      numero: [numero, Validators.required],
    })
  }

  createEmail(): FormGroup {
    return this.createEmailValues('');
  }

  createEmailValues(email): FormGroup {
    return this.fb.group({
      email: [email, Validators.required],
    })
  }

  submit() {
    const clienteSave = this.formGroup.value as ClientesDTO;
    if(this.cliente){
      clienteSave.id = this.cliente.id;
      clienteSave.version = this.cliente.version;
    }
    if (clienteSave.id > 0) {
      this.http.put(this.endPoint, JSON.stringify(clienteSave))
        .pipe().subscribe(
          data => {
            alert("Salvo com sucesso")
            this.dialogRef.close();
          },
          err => {
            alert(JSON.stringify("Erro ao salvar. Verifique o conteudo dos campos"));
            console.log(JSON.stringify(err));
            
          }
        );
    } else {
      this.http.post(this.endPoint, JSON.stringify(clienteSave))
      .pipe().subscribe(
        data => {
          alert("Salvo com sucesso")
          this.dialogRef.close();
        },
        err => {
          alert(JSON.stringify("Erro ao salvar. Verifique o conteudo dos campos"));
          console.log(JSON.stringify(err));
        }
      );
    }

  }

}

