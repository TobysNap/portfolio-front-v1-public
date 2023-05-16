import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Provincia, Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioApiService } from 'src/app/services/usuario-api.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  user!: Usuario;
  provincias: Provincia[] = [];
  usuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    descripcion: ['', Validators.required],
    edad: [18, Validators.required],
    localidad: ['', Validators.required],
    picUrl: ['', Validators.required],
    provincia: ['', Validators.required],
    profilePicUrl: ['', Validators.required],
    email: ['', Validators.required],
    facebook: [''],
    github: ['', Validators.required],
    instagram: [''],
    linkedin: ['', Validators.required],
    telefono: ['', Validators.required],
    twitter: ['']
  });


  constructor(
    public activeModal: NgbActiveModal,
    private apiService: UsuarioApiService,
    private fb: FormBuilder
  ) {}
 
  save() {
    const usuario: Usuario = {
      nombre: this.usuarioForm.value.nombre!,
      apellido: this.usuarioForm.value.apellido!,
      descripcion: this.usuarioForm.value.descripcion!,
      edad: this.usuarioForm.value.edad!,
      localidad: this.usuarioForm.value.localidad!,
      picUrl: this.usuarioForm.value.picUrl!,
      provincia: this.usuarioForm.value.provincia!,
      profilePicUrl: this.usuarioForm.value.profilePicUrl!,
      email: this.usuarioForm.value.email!,
      facebook: this.usuarioForm.value.facebook,
      github: this.usuarioForm.value.github!,
      instagram: this.usuarioForm.value.instagram,
      linkedin: this.usuarioForm.value.linkedin!,
      telefono: this.usuarioForm.value.telefono!,
      twitter: this.usuarioForm.value.twitter,
    }
    this.apiService.updateUsuario(usuario)
      .subscribe(() => {
        this.activeModal.close();
      })
  }

  ngOnInit() {
    this.getProvincias();
    this.esEditar();
  }

  getProvincias() {
    this.apiService.getProvincias()
      .subscribe((data) => {
        this.provincias = data;
      });
  }

  esEditar() {
    console.log(this.user.provincia)
    this.usuarioForm.patchValue({
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      descripcion: this.user.descripcion,
      edad: this.user.edad,
      localidad: this.user.localidad,
      picUrl: this.user.picUrl,
      provincia: this.user.provincia,
      profilePicUrl: this.user.profilePicUrl,
      email: this.user.email,
      facebook: this.user.facebook,
      github: this.user.github,
      instagram: this.user.instagram,
      linkedin: this.user.linkedin,
      telefono: this.user.telefono,
      twitter: this.user.twitter,
    })
  }

}
