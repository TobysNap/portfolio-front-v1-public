import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/Usuario';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
usuario!: Usuario;

  constructor(
    private apiService: UsuarioApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    protected loginService: LoginServiceService
  ) {}

  
  getUsuario() {
    this.apiService.getUsuario()
    .subscribe((data: Usuario) => {
      this.usuario = data;
    })
  }
  
  logout() {
    this.loginService.logout();
    this.loginService.isLoggedIn();
    this.toastr.info("Cerraste tu sesión!");
  } 
  
  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'logout-modal',
      centered: true
    }).result.then(() => {
      this.logout();
    })
  }

  ngOnInit() {
    this.loginService.isLoggedIn();
    this.getUsuario();
  }

}
