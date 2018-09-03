import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuarioComponent,
    MotelComponent,
    HabitacionComponent,
    DescuentoComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
