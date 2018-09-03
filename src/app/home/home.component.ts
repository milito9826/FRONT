import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { LoginUsuario } from '../model/usuario';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // usuario: Usuario;
  // idMongo: String;
  loginUsuarioGroup: FormGroup;
  loginUsuario: LoginUsuario;
  
  
  




  constructor(private fb : FormBuilder, 
              private _login: LoginService,
              private routes: Router) {

  
    this.loginUsuarioGroup = this.fb.group ({
    correoUsuario: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],  
    claveUsuario: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
    });
   }

  ngOnInit() {
  }

  onLogin() {
  this._login.onConsult(this.loginUsuarioGroup.value).subscribe((data) =>{
   
    if (!data.ok) {
      swal('usuario o clave incorrecto');
    } else {
      localStorage.setItem('token', data.token);
      this.routes.navigate(['usuario']);
      
    }
  }, err => {
    console.log(err);
    swal('usuario o clave incorrecto');

  });
  }

}
