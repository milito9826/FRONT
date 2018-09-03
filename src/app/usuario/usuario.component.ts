import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { ERROR_DEFS } from '../validators/messages-validators';
import swal from 'sweetalert';
import { claveValidator } from '../validators/messages-validators';
import { correoValidator } from '../validators/messages-validators';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']

})


export class UsuarioComponent implements OnInit {

  errores = ERROR_DEFS.usuario;
  visible = false;
  clave = true;
  guardar = true;
  modificar = false;
  submitType: String = 'Guardar';
  selectedRow: number;
  submitButton: String = 'btn btn-warning';
  usuario: Usuario;
  idMongo: String;
  formularioUsuario: FormGroup;
  usuarioFormGroup: FormGroup;
  claveFormGroup: FormGroup;
  correoFormGroup: FormGroup;
  perfiles: any[];




  usuarios: Array<Usuario> = [];
  usuariosInactivos: Array<Usuario> = [];

  constructor(private _usuarioService: UsuarioService,
    private fb: FormBuilder    ) {

    this.perfiles = [{name: 'Super Administrador'}, {name: 'Administrador'}, {name: 'Usuario'}];

    this.formularioUsuario = this.fb.group({

      documentoUsuario: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]+')]],
      apellidoUsuario: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]+')]],
      claveFormGroup: this.claveFormGroup,
      correoFormGroup: this.correoFormGroup
    });

    this.claveFormGroup = this.fb.group({
      claveUsuario: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      cclaveUsuario: ['', [Validators.required]],

    }, {
      validator: claveValidator.validate.bind(this)
    });

    this.correoFormGroup = this.fb.group({
      correoUsuario: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
      ccorreoUsuario: ['', [Validators.required]],
      perfilUsuario: ['', [Validators.required]],
    }, {
      validator: correoValidator.validate.bind(this)
    });
  }

  ngOnInit() {

    this.onList();
    this.onListInactivo();

  }
  onNew() {

    this.visible = true;
    this.clave = true;
    this.submitType = 'Guardar';
    this.submitButton = 'btn btn-warning';
    this.formularioUsuario.reset();
    this.claveFormGroup.reset();
    this.correoFormGroup.reset();

  }

  onList() {
    this._usuarioService.onList().subscribe((data) => {
      this.usuarios = data.datos;

    }, err => {

    });
  }

  onListInactivo() {
    this._usuarioService.onListInactivo().subscribe((data) => {
      this.usuariosInactivos = data.datos;

    }, err => {

    });
  }

  onSave() {


    const datos = this.formularioUsuario.value;

    datos.claveUsuario = this.claveFormGroup.value.claveUsuario;
    datos.perfilUsuario = this.correoFormGroup.value.perfilUsuario;
    datos.correoUsuario = this.correoFormGroup.value.correoUsuario;

    console.log(datos);

    this._usuarioService.onSave(datos).subscribe((data) => {
      if (!data.ok) {
        swal('Hubo un error al guardar');
      } else {
        swal('Se guardo correctamente');
        this.onList();


      }
    }, err => {
      swal('No se puede Crear un Usuario Vacio');

    });

  }

  onCancel() {

    this.submitButton = 'btn btn-warning';
    this.visible = false;
    this.formularioUsuario.reset();
    this.claveFormGroup.reset();
    this.correoFormGroup.reset();

  }

  onDelete(usuario) {
    this._usuarioService.onDelete(usuario._id, false).subscribe((data) => {
      if (!data.ok) {
        swal('Hubo un error al guardar.');
      } else {
        swal('Se modifico correctamente');
        this.onList();
        this.onListInactivo();
        this.visible = false;
        this.formularioUsuario.reset();
        this.claveFormGroup.reset();
        this.correoFormGroup.reset();
      }

    }, err => {
      alert(err);

    });
    console.log(usuario);
  }


  onEdit(usuario) {

    this.visible = true;
    this.clave = false;
    this.submitType = 'Confirmar Cambios';
    this.submitButton = 'btn btn-danger';
    this.usuario = usuario;
    this.idMongo = usuario._id;


    this._usuarioService.onView(usuario._id).subscribe((data) => {

        this.formularioUsuario.patchValue({

        documentoUsuario:  data.datos.documentoUsuario,
        nombreUsuario:  data.datos.nombreUsuario,
        apellidoUsuario: data.datos.apellidoUsuario

      });

      this.correoFormGroup.patchValue({

        correoUsuario: data.datos.correoUsuario,
        ccorreoUsuario: data.datos.correoUsuario,
        perfilUsuario: data.datos.perfilUsuario

      });

      console.log(data.datos.perfilUsuario);

      this.claveFormGroup.patchValue({

        claveUsuario: data.datos.claveUsuario,
        cclaveUsuario: data.datos.claveUsuario
      });


    }, err => {
      alert(err);
      console.log('object');
    });

  }


  onEditar() {

    const datos = this.formularioUsuario.value;

    datos.claveUsuario = this.claveFormGroup.value.claveUsuario;
    datos.perfilUsuario = this.correoFormGroup.value.perfilUsuario;
    datos.correoUsuario = this.correoFormGroup.value.correoUsuario;



    this._usuarioService.onEdit(datos, this.idMongo).subscribe((data) => {
      this.visible = false;
      this.guardar = false;
      this.modificar = true;
      this.onList();
      this.submitType = 'Guardar';
      this.submitButton = 'btn btn-warning';
      this.formularioUsuario.reset();
      this.claveFormGroup.reset();
      this.correoFormGroup.reset();




    }, err => {
      alert(err);

    });
  }


  superGuardarEditar() {
    if (this.submitType === 'Guardar') {
      this.onSave();
    } else {
      this.onEditar();
    }
  }

  onActivate(usuario) {
    this._usuarioService.onDelete(usuario._id, true).subscribe((data) => {
      if (!data.ok) {
        swal('Hubo un error al guardar.');
      } else {
        swal('Se modifico correctamente');
        this.onList();
        this.onListInactivo();
      }

    }, err => {
      alert(err);

    });
    console.log(usuario);
  }



}


