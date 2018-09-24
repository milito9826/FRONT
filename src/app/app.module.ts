import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioComponent } from './usuario/usuario.component';
import { ReactiveFormsModule, FormsModule } from  '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MotelComponent } from './motel/motel.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { DescuentoComponent } from './descuento/descuento.component';
import { ReservaComponent } from './reserva/reserva.component';
import { appRoutes } from './app.routing';
import { AgmCoreModule} from '@agm/core';
import { MessageService } from './service/message.service';
import { Select2Module } from "ng-select2-component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuarioComponent,
    MotelComponent,
    HabitacionComponent,
    DescuentoComponent,
    ReservaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBl4wJPHssg-A9ADDTr1rNRvDE1thT6NjU",
      libraries: ["places"]
    }),
    Select2Module
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
