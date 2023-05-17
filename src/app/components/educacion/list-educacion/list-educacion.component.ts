import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Educacion } from 'src/app/interfaces/Educacion';
import { EducacionApiService } from 'src/app/services/educacion-api.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { AddEditEducacionComponent } from '../add-edit-educacion/add-edit-educacion.component';

@Component({
  selector: 'app-list-educacion',
  templateUrl: './list-educacion.component.html',
  styleUrls: ['./list-educacion.component.css']
})
export class ListEducacionComponent implements OnInit {

  loading: boolean = false;
  educaciones: Educacion[] = [];


  constructor(
    private apiService: EducacionApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    protected loginService: LoginServiceService,
  ) { }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      centered: true
    });
    modalRef.result.then(() => {
      this.deleteEducacion(id);
      this.toastr.success("Item eliminado con éxito!");
    },
    () => {
      this.toastr.error("Operación cancelada");
    });
  }


  deleteEducacion(id: number): void {
    this.loading = true;
    this.apiService.deleteEducacion(id)
      .subscribe(() => {
        this.getEducaciones();
      })
  }

  getEducaciones(): void {
    this.loading = true
    this.apiService.getEducacion()
      .subscribe((data: Educacion[]) => {
        this.educaciones = data;
        this.loading = false;
      })
  }

  open(id?: number): void {
    const modalRef = this.modalService.open(AddEditEducacionComponent, {
     centered: true,
     size: 'lg'
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
     this.getEducaciones()
    })
   }

  ngOnInit(): void {
    this.getEducaciones();
    this.loginService.isLoggedIn();
  }

}