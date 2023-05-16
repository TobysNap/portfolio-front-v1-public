import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Proyecto } from 'src/app/interfaces/Proyecto';
import { ProyectoApiService } from 'src/app/services/proyecto-api.service';

@Component({
  selector: 'app-add-edit-proyecto',
  templateUrl: './add-edit-proyecto.component.html',
  styleUrls: ['./add-edit-proyecto.component.css']
})
export class AddEditProyectoComponent implements OnInit {

  proyectoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    url: ['', Validators.required],
    imgUrl: ['']
  });
  accion: string = 'Agregar '
  @Input() public id?: number;

  constructor(
    private apiService: ProyectoApiService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  esEditar(id: number | undefined): void {
    if(id !== undefined) {
      this.accion = 'Editar ';
      this.getProyecto(id);
    }
  }

  getProyecto(id: number): void {
    this.apiService.getProyectoById(id)
      .subscribe((data) => {
        this.proyectoForm.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          url: data.url,
          imgUrl: data.imgUrl,
        })
    });
  }

  saveProyecto(): void {
    const proyecto: Proyecto = {
      nombre: this.proyectoForm.value.nombre!,
      descripcion: this.proyectoForm.value.descripcion!,
      url: this.proyectoForm.value.url!,
      imgUrl: this.proyectoForm.value.imgUrl,
    }
    if(this.id == undefined) {
      this.apiService.newProyecto(proyecto)
        .subscribe(() => {
          this.activeModal.close('Enviar click');
        })
    } else {
      this.apiService.updateProyecto(this.id, proyecto)
        .subscribe(() => {
          this.activeModal.close('Enviar click');
        })
    }
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

}
