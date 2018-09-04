import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MotelComponent} from './motel/motel.component';
import { HabitacionComponent} from './habitacion/habitacion.component';
import { ReservaComponent} from './reserva/reserva.component';
import { DescuentoComponent} from './descuento/descuento.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'motel',
    component: MotelComponent
  },
  {
    path: 'habitacion',
    component: HabitacionComponent
  },
  {
    path: 'descuento',
    component: DescuentoComponent
  },
  {
    path: 'reserva',
    component: ReservaComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
