import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/interfaces/Experiencia';

import { ExperienciaApiService } from 'src/app/services/experiencia-api.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { AddEditExperienciaComponent } from '../add-edit-experiencia/add-edit-experiencia.component';

@Component({
  selector: 'app-list-experiencia',
  templateUrl: './list-experiencia.component.html',
  styleUrls: ['./list-experiencia.component.css']
})
export class ListExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = [];

  constructor(
    protected loginService: LoginServiceService,
    private apiService: ExperienciaApiService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  deleteExperiencia(id: number): void {
    this.apiService.deleteExperiencia(id)
      .subscribe(() => {
        this.getExperiencias();
      })
  }

  getExperiencias(): void {
    this.apiService.getExperiencia()
    .subscribe((data: Experiencia[]) => {
      this.experiencias = data;
    })
  }

  delete(id: number) {
      const modalRef = this.modalService.open(DeleteModalComponent, {
        centered: true
      });
      modalRef.result.then(() => {
        this.deleteExperiencia(id);
        this.toastr.success("Item eliminado con éxito!");
      },
      () => {
        this.toastr.error("Operación cancelada");
      });
  }
  
  open(id?: number): void {
    const modalRef = this.modalService.open(AddEditExperienciaComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
      this.toastr.success("Modificado con éxito!");
      this.getExperiencias();
    })
   } 

  ngOnInit() {
    this.getExperiencias();
    this.loginService.isLoggedIn();
  }

}
