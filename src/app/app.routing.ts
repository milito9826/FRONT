import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';



export const appRoutes: Routes = [
    { path: 'usuario', component: UsuarioComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: HomeComponent },
  ];
  