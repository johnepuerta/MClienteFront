import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { Router } from '@angular/router';
import { LogoutService } from './../core/logout.service';
import { AuthService } from './../core/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit, AfterViewInit {

  endPoint = 'http://localhost:8080/clientes';
  isPermiteEscrita = this.authService.isAuthorized(["ADMIN"]);
  displayedColumns = ['codigo', 'nome', 'cpf', 'actions']
  dados: any[] = [];
  ELEMENT_DATA: any;
  dataSource: MatTableDataSource<any>;
  carregando = false;

  constructor(private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.carregaDados();
  }
  carregaDados() {
    this.http.get(this.endPoint)
      .pipe().subscribe(
        data => {
          this.carregando = false;
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        },
        err => {
          alert(err.error['status'] + ": " + err.error['message'] || 'Erro inesperado!');
        }
      );
  }

  ngOnInit() {
  }

  sair() {
    if (confirm("Deseja realmente sair do sistema?")) {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  excluir(id) {
    if (confirm("Deseja realmente excluir o cliente?")) {
      this.http.delete(this.endPoint + "/" + id)
        .pipe().subscribe(
          data => {
            this.carregaDados();
          },
          err => {
            alert(err.error['status'] + ": " + err.error['message'] || 'Erro inesperado!');
          }
        );
    }
  }

  editar(id) {
    const dialogRef = this.dialog.open(ClienteCadastroComponent, {data: { "id": id}});
    dialogRef.afterClosed().subscribe(result => {
      this.carregaDados();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(ClienteCadastroComponent, {data: { "id": 0}});
    dialogRef.afterClosed().subscribe(result => {
      this.carregaDados();
    });

  }
  // const dialogRef = this.modalService.open(
  //   ClienteCadastroComponent, {size: 'xl', backdrop: 'static', keyboard : false, scrollable: true});
  // dialogRef.componentInstance.id = id;
  // dialogRef.result.then((fechou) => {
  //   this.carregaDados();
  // });
}

