import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { MessageService } from '../service/message.service';


declare var $ : any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  loginUsuarioGroup: FormGroup;
  verCorreoFormGroup: FormGroup;


  constructor(private fb : FormBuilder, public _MessageService: MessageService) {
    

    this.loginUsuarioGroup = this.fb.group ({
      correoUsuario: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],  
      claveUsuario: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
    })

    this.verCorreoFormGroup = this.fb.group ({
      verCorreo : ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],

    })


   }

  ngOnInit() {

  }

    
 
 
 olvideClave(){
  this.verCorreoFormGroup.reset();
    $("#resetClave").modal();
 }
 
 contactForm() {
  this._MessageService.sendMessage(this.verCorreoFormGroup.value).subscribe(() => {
  swal("Formulario de contacto", "Mensaje enviado correctamente", 'success');
  });
  }


  }


