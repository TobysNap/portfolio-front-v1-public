import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Habilidad } from 'src/app/interfaces/Habilidad';
import { HabilidadApiService } from 'src/app/services/habilidad-api.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { AddEditHabilidadComponent } from '../add-edit-habilidad/add-edit-habilidad.component';

@Component({
  selector: 'app-list-habilidad',
  templateUrl: './list-habilidad.component.html',
  styleUrls: ['./list-habilidad.component.css']
})
export class ListHabilidadComponent implements OnInit {

  habilidades: Habilidad[] = [];

  constructor(
    private apiService: HabilidadApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    protected loginService: LoginServiceService,
  ) {}

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      centered: true
    });
    modalRef.result.then(() => {
      this.deleteHabilidad(id);
      this.toastr.success("Item eliminado con éxito!");
    },
    () => {
      this.toastr.error("Operación cancelada");
    });
  }


  deleteHabilidad(id: number): void {
    this.apiService.deleteHabilidad(id)
      .subscribe(() => {
        this.getHabilidades();
      })
  }

  getHabilidades(): void {
    this.apiService.getHabilidad()
      .subscribe((data: Habilidad[]) => {
        this.habilidades = data;
      })
  }

  open(id?: number): void {
    const modalRef = this.modalService.open(AddEditHabilidadComponent, {
     centered: true,
     size: 'lg'
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
     this.getHabilidades()
    })
   } 

  ngOnInit() {
    this.getHabilidades();
    this.loginService.isLoggedIn();
  }

}
