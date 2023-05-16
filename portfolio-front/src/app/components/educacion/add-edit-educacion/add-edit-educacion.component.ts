import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Educacion } from 'src/app/interfaces/Educacion';
import { EducacionApiService } from 'src/app/services/educacion-api.service';

@Component({
  selector: 'app-add-edit-educacion',
  templateUrl: './add-edit-educacion.component.html',
  styleUrls: ['./add-edit-educacion.component.css']
})
export class AddEditEducacionComponent implements OnInit {
  accion: string = 'Agregar ';
  educacionForm = this.fb.group({
    carrera: ['', Validators.required],
    titulo: ['', Validators.required],
    establecimiento: ['', Validators.required],
    periodo: ['', Validators.required]
  });
  @Input() public id?: number;

  constructor(
    private apiService: EducacionApiService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  saveEducacion() {
    const educacion: Educacion = {
      carrera: this.educacionForm.value.carrera!,
      titulo: this.educacionForm.value.titulo!,
      establecimiento: this.educacionForm.value.establecimiento!,
      periodo: this.educacionForm.value.periodo!
    }

    if(this.id == undefined) {
      this.apiService.newEducacion(educacion)
      .subscribe(() => {
        this.activeModal.close('Enviar click');
      })
    } else {
      this.apiService.updateEducacion(this.id, educacion)
      .subscribe(() => {
        this.activeModal.close('Enviar click');
      })
    }
    
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if(id !== undefined) {
      this.accion = 'Editar ';
      this.getEducacion(id);
    }
  }

  getEducacion(id: number) {
    this.apiService.getEducacionById(id)
    .subscribe((data) => {
      this.educacionForm.patchValue({
        carrera: data.carrera,
        titulo: data.titulo,
        establecimiento: data.establecimiento,
        periodo: data.periodo
      })
    });
  }
}
