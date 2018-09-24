import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Habitacion } from '../model/habitacion';
import { HabitacionService } from '../service/habitacion.service';
import { Motel } from '../model/motel';
import { MotelService } from '../service/motel.service';
import { ERROR_DEFS } from '../validators/messages-validators';
import swal from 'sweetalert';
import { ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Select2Data } from 'ng-select2-component';


@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss']

})

export class HabitacionComponent implements OnInit {

  selectedFile = null;

  data: Select2Data = [
    { value: 'AA', label: 'Aire Acondicionado' },
    { value: 'CM', label: 'Cama con Movimiento' },
    { value: 'CA', label: 'Cama de Agua' },
    { value: 'CD', label: 'Canales Deportivos' },

  ];

  valores_servicios = [];

  update_servicios = [];

  visible = false;
  guardar = true;
  modificar = false;
  submitType: string = 'Guardar';
  selectedRow: number;
  submitButton: string = "btn btn-warning"
  formHabitacion: FormGroup;
  habitacion: Habitacion;
  idMongo: String;
  tipos: any[];

  // habitacionModel: Habitacion = {
  //   numeroHabitacion: '',
  //   tipoHabitacion: '',
  //   servicioHabitacion: [],
  //   precioHabitacion: 0,
  //   descuentoHabitacion: 0,
  //   fotoHabitacion: ''
  //}


  habitaciones: Array<Habitacion> = [];
  habitacionesInactivos: Array<Habitacion> = [];

  constructor(private _habitacionService: HabitacionService, private fb: FormBuilder, private builder: FormBuilder) {

    this.tipos = [{ name: 'Suite' }, { name: 'Doble' }, { name: 'Sencilla' }, { name: 'Deluxe' }];



    this.formHabitacion = this.fb.group({

      numeroHabitacion: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
      tipoHabitacion: ['', Validators.required],
      servicioHabitacion: ['', Validators.required],
      precioHabitacion: ['', Validators.required],
      descuentoHabitacion: ['', Validators.required],
      fotoHabitacion: ['', Validators.required],

    });

  }


  ngOnInit() {
    this.onList();
    this.onListInactivo();
  }

  onNew() {
    this.visible = true;
    this.submitType = 'Guardar';
    this.submitButton = 'btn btn-warning'
    this.formHabitacion.reset();
  }

  onList() {
    this._habitacionService.onList().subscribe((data) => {
      this.habitaciones = data.datos;

    }, err => {

    });
  }

  onListInactivo() {
    this._habitacionService.onListInactivo().subscribe((data) => {
      this.habitacionesInactivos = data.datos;

    }, err => {

    });
  }


  onSave() {

    const datos = this.formHabitacion.value;

    datos.tipoHabitacion = this.formHabitacion.value.tipoHabitacion;
    datos.servicioHabitacionn = this.valores_servicios;

    this._habitacionService.onSave(datos).subscribe((data) => {
      if (!data.ok) {
        swal("Hubo un error al guardar.");
      } else {
        swal("Se guardo correctamente.");
        this.onList();
        this.formHabitacion.reset();
        this.visible = false;

      }
    }, err => {
      swal('No se puede Crear una Habitacion Vacia _ ' + err);

    });
    // this._habitacionService.onSave(this.habitacionModel).subscribe((data) => {
    //   if (!data.ok) {
    //     alert("Hubo un error al guardar.  ");
    //   } else {
    //     alert("Se guardo correctamente.");
    //     this.onList();

    //     this.habitacionModel = {
    //       tipoHabitacion: '',
    //       numeroHabitacion: '',
    //       servicioHabitacion: '',
    //       precioHabitacion: 0,
    //       descuentoHabitacion: 0,
    //       estadoHabitacion: true
    //     }
    //   }
    // }, err => {
    //   alert(err);
    //   console.log("object");
    // })

    this.visible = false;
  }

  onCancel() {
    this.visible = false;
    this.submitButton = 'btn btn-warning'
    this.formHabitacion.reset();
    this.valores_servicios = [];

  }

  onDelete(habitacion) {

    this._habitacionService.onDelete(habitacion._id, false).subscribe((data) => {
      if (!data.ok) {
        swal("Hubo un error al Modificar.  ");
      } else {
        swal("Se modifico correctamente");
        this.onList();
        this.onListInactivo();
        this.visible = false;
        this.formHabitacion.reset();
      }

    }, err => {
      alert(err);

    });
  }


  onEdit(habitacion) {

    this.visible = true;
    this.submitType = 'Confirmar Cambios';
    this.submitButton = 'btn btn-danger';
    this.habitacion = habitacion;
    this.idMongo = habitacion._id;

    setTimeout(() => {
      this.valores_servicios = habitacion.servicioHabitacion;
     }, 500);


    this._habitacionService.onView(habitacion._id).subscribe((data) => {

      this.formHabitacion.patchValue({

        numeroHabitacion: data.datos.numeroHabitacion,
        tipoHabitacion: data.datos.tipoHabitacion,
        // servicioHabitacion: data.datos.servicioHabitacion,
        precioHabitacion: data.datos.precioHabitacion,
        descuentoHabitacion: data.datos.descuentoHabitacion,
      });

      // this.valores_servicios = JSON.parse();

    }, err => {
      alert(err);

    })


  }

  onEditar() {

    const datos = this.formHabitacion.value;

    this._habitacionService.onEdit(datos, this.idMongo).subscribe((data) => {
      this.visible = false;
      this.guardar = false;
      this.modificar = true;
      this.onList();
      this.submitType = 'Guardar';
      this.submitButton = 'btn btn-warning';
      this.formHabitacion.reset();
      this.valores_servicios = [];


    }, err => {
      alert(err);

    })
  }


  superGuardarEditar() {
    if (this.submitType === 'Guardar') {
      this.onSave();
    } else {
      this.onEditar();
    }
  }

  onActivate(habitacion) {
    this._habitacionService.onDelete(habitacion._id, true).subscribe((data) => {
      if (!data.ok) {
        swal('Hubo un error al modificar.');
      } else {
        swal('Se modifico correctamente');
        this.onList();
        this.onListInactivo();
      }

    }, err => {
      alert(err);

    });


  }

  update_valores_servicios(value: string[]) {
    this.valores_servicios = value;
  }

  processFile(event) {
    console.log(event);

  }


//   document.getElementById("upload_widget_opener").addEventListener("click", function() {
//     cloudinary.openUploadWidget({
//             cloud_name: 'motelsinn',
//             upload_preset: 'mddyvuj6'
//         },
//         function(error, result) {
//             console.log(error, result)
//         });
// }, false);


}
