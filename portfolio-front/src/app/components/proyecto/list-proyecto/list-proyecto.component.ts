import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Proyecto } from 'src/app/interfaces/Proyecto';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProyectoApiService } from 'src/app/services/proyecto-api.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { AddEditProyectoComponent } from '../add-edit-proyecto/add-edit-proyecto.component';

@Component({
  selector: 'app-list-proyecto',
  templateUrl: './list-proyecto.component.html',
  styleUrls: ['./list-proyecto.component.css']
})
export class ListProyectoComponent implements OnInit {

  proyectos: Proyecto[] = [];

  constructor(
    private apiService: ProyectoApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    protected loginService: LoginServiceService,
  ) {}

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      centered: true
    });
    modalRef.result.then(() => {
      this.deleteProyecto(id);
      this.toastr.success("Item eliminado con éxito!");
    },
    () => {
      this.toastr.error("Operación cancelada");
    });
  }


  deleteProyecto(id: number): void {
    this.apiService.deleteProyecto(id)
      .subscribe(() => {
        this.getProyectos();
      })
  }

  getProyectos(): void {
    this.apiService.getProyecto()
      .subscribe((data: Proyecto[]) => {
        this.proyectos = data;
      })
  }

  open(id?: number): void {
    const modalRef = this.modalService.open(AddEditProyectoComponent, {
     centered: true,
     size: 'lg'
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
     this.getProyectos()
    })
   } 

  ngOnInit() {
    this.getProyectos();
    this.loginService.isLoggedIn();
  }

}
