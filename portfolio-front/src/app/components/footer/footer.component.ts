import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  usuario!: Usuario;
  
  constructor(
    private apiService: UsuarioApiService
  ) {}

  getUsuario() {
    this.apiService.getUsuario()
      .subscribe((data: Usuario) => {
        this.usuario = data;
      })
  }

  ngOnInit(): void {
    this.getUsuario();
  }

}
