import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Usuario } from 'src/app/interfaces/Usuario';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {
  usuario!: Usuario;
  
  constructor(
    private apiService: UsuarioApiService,
    protected loginService: LoginServiceService,
    private modalService: NgbModal
  ) {}

  getUsuario() {
    this.apiService.getUsuario()
      .subscribe((data: Usuario) => {
        this.usuario = data;
      })
  }

  open() {
    const modalRef = this.modalService.open(EditUsuarioComponent, {
      centered: true,
      size: 'lg'
     });
     modalRef.componentInstance.user = this.usuario;
     modalRef.result.then(() => {
      this.getUsuario()
     })
  }

  ngOnInit(): void {
    this.getUsuario();
    this.loginService.isLoggedIn();
  }

}
