import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbDatepickerModule, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AddEditEducacionComponent } from './components/educacion/add-edit-educacion/add-edit-educacion.component';
import { AddEditExperienciaComponent } from './components/experiencia/add-edit-experiencia/add-edit-experiencia.component';
import { AddEditHabilidadComponent } from './components/habilidad/add-edit-habilidad/add-edit-habilidad.component';
import { AddEditProyectoComponent } from './components/proyecto/add-edit-proyecto/add-edit-proyecto.component';
import { AppComponent } from './app.component';
import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListEducacionComponent } from './components/educacion/list-educacion/list-educacion.component';
import { ListExperienciaComponent } from './components/experiencia/list-experiencia/list-experiencia.component';
import { ListHabilidadComponent } from './components/habilidad/list-habilidad/list-habilidad.component';
import { ListProyectoComponent } from './components/proyecto/list-proyecto/list-proyecto.component';
import { ListUsuarioComponent } from './components/usuario/list-usuario/list-usuario.component';
import { LoadingBarComponent } from './shared/loading-bar/loading-bar.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEducacionComponent,
    AddEditEducacionComponent,
    NavbarComponent,
    LoadingBarComponent,
    ListUsuarioComponent,
    EditUsuarioComponent,
    AddEditExperienciaComponent,
    ListExperienciaComponent,
    ListHabilidadComponent,
    AddEditHabilidadComponent,
    ListProyectoComponent,
    AddEditProyectoComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    DeleteModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgbModule,
    NgbProgressbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 2000
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
