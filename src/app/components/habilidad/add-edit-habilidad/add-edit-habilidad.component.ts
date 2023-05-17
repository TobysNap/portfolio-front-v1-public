import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/interfaces/Habilidad';
import { HabilidadApiService } from 'src/app/services/habilidad-api.service';

@Component({
  selector: 'app-add-edit-habilidad',
  templateUrl: './add-edit-habilidad.component.html',
  styleUrls: ['./add-edit-habilidad.component.css']
})
export class AddEditHabilidadComponent implements OnInit {
  habilidadForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    puntaje: [1, Validators.required],
    tipoHabilidad: ['', Validators.required]
  });
  accion: string = 'Agregar '
  @Input() public id?: number;

  constructor(
    private apiService: HabilidadApiService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  esEditar(id: number | undefined): void {
    if(id !== undefined) {
      this.accion = 'Editar ';
      this.getHabilidad(id);
    }
  }

  getHabilidad(id: number): void {
    this.apiService.getHabilidadById(id)
      .subscribe((data) => {
        this.habilidadForm.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          puntaje: data.puntaje,
          tipoHabilidad: data.tipoHabilidad
        })
    });
  }

  saveHabilidad(): void {
    const habilidad: Habilidad = {
      nombre: this.habilidadForm.value.nombre!,
      descripcion: this.habilidadForm.value.descripcion!,
      puntaje: this.habilidadForm.value.puntaje!,
      tipoHabilidad: this.habilidadForm.value.tipoHabilidad!
    }
    if(this.id == undefined) {
      this.apiService.newHabilidad(habilidad)
        .subscribe(() => {
          this.activeModal.close('Enviar click');
        })
    } else {
      this.apiService.updateHabilidad(this.id, habilidad)
        .subscribe(() => {
          this.activeModal.close('Enviar click');
        })
    }
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

}
