import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Experiencia } from 'src/app/interfaces/Experiencia';
import { ExperienciaApiService } from 'src/app/services/experiencia-api.service';

@Component({
  selector: 'app-add-edit-experiencia',
  templateUrl: './add-edit-experiencia.component.html',
  styleUrls: ['./add-edit-experiencia.component.css']
})
export class AddEditExperienciaComponent implements OnInit {

  experienciaForm = this.fb.group({
    establecimiento: ['', Validators.required],
    puesto: ['', Validators.required],
    tipoEmpleo: ['', Validators.required],
    periodo: ['', Validators.required],
    contactoExperiencia: ['', Validators.required]
  });
  accion: string = 'Agregar '
  @Input() public id?: number;

  constructor(
    private apiService: ExperienciaApiService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  esEditar(id: number | undefined): void {
    if(id !== undefined) {
      this.accion = 'Editar ';
      this.getExperiencia(id);
    }
  }

  getExperiencia(id: number): void {
    this.apiService.getExperienciaById(id)
      .subscribe((data) => {
        this.experienciaForm.patchValue({
          establecimiento: data.establecimiento,
          puesto: data.puesto,
          tipoEmpleo: data.tipoEmpleo,
          periodo: data.periodo,
          contactoExperiencia: data.contactoExperiencia,
        })
    });
  }

  saveExperiencia(): void {
    const experiencia: Experiencia = {
      establecimiento: this.experienciaForm.value.establecimiento!,
      puesto: this.experienciaForm.value.puesto!,
      tipoEmpleo: this.experienciaForm.value.tipoEmpleo!,
      periodo: this.experienciaForm.value.periodo!,
      contactoExperiencia: this.experienciaForm.value.contactoExperiencia!,
    }
    if(this.id == undefined) {
      this.apiService.newExperiencia(experiencia)
        .subscribe(() => {
          this.activeModal.close('Enviar click');
        })
    } else {
      this.apiService.updateExperiencia(this.id, experiencia)
        .subscribe(() => {
          this.activeModal.close('Enviar click');
        })
    }
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

}
