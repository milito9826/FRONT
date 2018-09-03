import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Motel } from '../model/motel';
import { MotelService } from '../service/motel.service';
import { ERROR_DEFS } from '../validators/messages-validators';
import swal from 'sweetalert';



@Component({
  selector: 'app-motel',
  templateUrl: './motel.component.html',
  styleUrls: ['./motel.component.scss']

})

export class MotelComponent implements OnInit {

  errores = ERROR_DEFS.motel;
  visible = false;
  guardar = true;
  modificar = false;
  submitType: string = 'Guardar';
  selectedRow: number;
  submitButton: string = "btn btn-warning"
  motel: Motel;
  idMongo: String;
  formularioMotel: FormGroup;




  motelModel: Motel = {
    nitMotel: '',
    nombreMotel: '',
    direccionMotel: '',
    telefonoMotel: '',
    correoMotel: '',
    pagWebMotel: '',
    latitudMotel: '',
    longitudMotel: '',
    estadoMotel: true
  }


  moteles: Array<Motel> = [];

  constructor(private _motelService: MotelService,
	      private fb: FormBuilder) {

    this.formularioMotel = this.fb.group({

      nitMotel: ['', [Validators.required, Validators.minLength(10)]],
      nombreMotel: ['', Validators.required],
      direccionMotel: ['', Validators.required],
      telefonoMotel: ['', Validators.required],
      correoMotel: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
      pagWebMotel: ['', Validators.required],
      latitudMotel: ['', Validators.required],
      longitudMotel: ['', Validators.required]
    
    })
  }

  ngOnInit() {

    this.onList();
  }
  onNew() {
    this.visible = true;
    this.submitType = 'Guardar';
    this.submitButton = 'btn btn-warning'

  }

  onList() {
    this._motelService.onList().subscribe((data) => {
      this.moteles = data.datos;
      
    }, err => {

    });
  }

  onSave() {
    this._motelService.onSave(this.motelModel).subscribe((data) => {
      if (!data.ok) {
        swal("Hubo un error al guardar.");
      } else {
        swal("Se guardo correctamente.");
        this.onList();

        this.motelModel = {
          nitMotel: "",
          nombreMotel: "",
          direccionMotel: "",
          telefonoMotel: "",
          correoMotel: "",
          pagWebMotel: "",
          latitudMotel: "",
          longitudMotel: "",
          estadoMotel: true
        }
      }
    }, err => {
      alert(err);
      
    })

    this.motelModel.nitMotel = '';
    this.motelModel.nombreMotel = '';
    this.motelModel.direccionMotel = '';
    this.motelModel.telefonoMotel = '';
    this.motelModel.correoMotel = '';
    this.motelModel.pagWebMotel = '';
    this.motelModel.latitudMotel = '';
    this.motelModel.longitudMotel = '';
    this.visible = false;


  }

  onCancel() {
    this.visible = false;
    this.submitButton = 'btn btn-warning'

  }

  onDelete(motel) {
    this._motelService.onDelete(motel._id, false).subscribe((data) => {
      if (!data.ok) {
        swal("Hubo un error al Eliminar.  ");
      } else {
        swal("Se modifico correctamente");
        this.onList();
      }

    }, err => {
      alert(err);

    })
    console.log(motel);
  }



  onEdit(motel) {
    this.visible = true;
    this.submitType = 'Confirmar Cambios';
    this.submitButton = 'btn btn-danger'
    this.motel = motel;
    this.idMongo = motel._id;

    this._motelService.onView(motel._id).subscribe((data) => {
      this.motelModel.nitMotel = data.datos.nitMotel,
        this.motelModel.nombreMotel = data.datos.nombreMotel,
        this.motelModel.direccionMotel = data.datos.direccionMotel,
        this.motelModel.telefonoMotel = data.datos.telefonoMotel,
        this.motelModel.correoMotel = data.datos.correoMotel,
        this.motelModel.pagWebMotel = data.datos.pagWebMotel,
        this.motelModel.latitudMotel = data.datos.latitudMotel,
        this.motelModel.longitudMotel = data.datos.longitudMotel


    }, err => {
      alert(err);
      console.log("object");
    })
  }

  onEditar() {

    this._motelService.onEdit(this.motelModel, this.idMongo).subscribe((data) => {
      this.visible = true;
      this.guardar = false;
      this.modificar = true;
      this.onList();
      this.submitType = 'Guardar';
      this.submitButton = 'btn btn-warning';
      this.motelModel.nitMotel = '';
      this.motelModel.nombreMotel = '';
      this.motelModel.direccionMotel = '';
      this.motelModel.telefonoMotel = '';
      this.motelModel.correoMotel = '';
      this.motelModel.pagWebMotel = '';
      this.motelModel.latitudMotel = '';
      this.motelModel.longitudMotel = '';



    }, err => {
      alert(err);
      console.log("object");
    })
  }


  superGuardarEditar() {
    if (this.submitType === 'Guardar') {
      this.onSave();
    } else {
      this.onEditar();
    }
  }
}
