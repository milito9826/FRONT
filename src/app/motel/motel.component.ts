import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Motel } from '../model/motel';
import { MotelService } from '../service/motel.service';
import { ERROR_DEFS } from '../validators/messages-validators';
import swal from 'sweetalert';
import { ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-motel',
  templateUrl: './motel.component.html',
  styleUrls: ['./motel.component.scss']

})

export class MotelComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public buscarControl: FormControl;
  public zoom: number;

  @ViewChild("buscar")
  public searchElementRef: ElementRef;

  // latitude = 6.2518400;
  // longitude = -75.5635900;
  // locationChosen = false;


  // onChoseLocation (event) {
  //   this.latitude = event.coords.lat;
  //   this.longitude = event.coords.lng;
  //   this.locationChosen = true;
  // }

  visible = false;
  guardar = true;
  modificar = false;
  submitType: String = 'Guardar';
  selectedRow: number;
  submitButton: String = "btn btn-warning"
  motel: Motel;
  idMongo: String;
  formularioMotel: FormGroup;


  moteles: Array<Motel> = [];
  motelesInactivos: Array<Motel> = [];

  constructor(
    private _motelService: MotelService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {

    this.formularioMotel = this.fb.group({

      nitMotel: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      nombreMotel: ['', [Validators.required, Validators.minLength(2)]],
      direccionMotel: ['', Validators.required],
      telefonoMotel: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]*$')]],
      correoMotel: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
      pageWebMotel: ['', [Validators.required, Validators.pattern('w{3}.[a-z]+\.?[a-z]{2,3}(|\.[a-z]{2,3})')]],
      // latitudMotel: ['', Validators.required],
      // longitudMotel: ['', Validators.required]

    })
  }

  ngOnInit() {
    this.onList();
    this.onListInactivo();
  }

  mapa(){
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 6.2518400;
    this.longitude = -75.5635900;

    //set current position
    this.setCurrentPosition();

    let input = <HTMLInputElement>document.getElementById("mapa_buscar");

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }


  onNew() {
    this.visible = true;
    this.submitType = 'Guardar';
    this.submitButton = 'btn btn-warning'
    this.formularioMotel.reset();
    setTimeout(()=>{
      this.mapa();
    }, 1000)
  }

  onList() {
    this._motelService.onList().subscribe((data) => {
      this.moteles = data.datos;

    }, err => {

    });
  }

  onListInactivo() {
    this._motelService.onListInactivo().subscribe((data) => {
      this.motelesInactivos = data.datos;

    }, err => {

    });
  }

  onSave() {

    const datos = this.formularioMotel.value;

    this._motelService.onSave(datos).subscribe((data) => {
      if (!data.ok) {
        swal("Hubo un error al guardar.");
      } else {
        swal("Se guardo correctamente.");
        this.onList();
        this.formularioMotel.reset();
        this.visible = false;

      }
    }, err => {
      swal('No se puede Crear un Usuario Vacio');

    });

    this.visible = false;
  }

  onCancel() {
    this.visible = false;
    this.submitButton = 'btn btn-warning'
    this.formularioMotel.reset();

  }

  onDelete(motel) {
    this._motelService.onDelete(motel._id, false).subscribe((data) => {
      if (!data.ok) {
        swal("Hubo un error al Modificar.  ");
      } else {
        swal("Se modifico correctamente");
        this.onList();
        this.onListInactivo();
        this.visible = false;
        this.formularioMotel.reset();
      }

    }, err => {
      alert(err);

    });

  }



  onEdit(motel) {
    this.visible = true;
    this.submitType = 'Confirmar Cambios';
    this.submitButton = 'btn btn-danger'
    this.motel = motel;
    this.idMongo = motel._id;

    this._motelService.onView(motel._id).subscribe((data) => {

      this.formularioMotel.patchValue({

        nitMotel: data.datos.nitMotel,
        nombreMotel: data.datos.nombreMotel,
        direccionMotel: data.datos.direccionMotel,
        telefonoMotel: data.datos.telefonoMotel,
        correoMotel: data.datos.correoMotel,
        pagWebMotel: data.datos.pagWebMotel

      });


    }, err => {
      alert(err);

    })
  }

  onEditar() {

    const datos = this.formularioMotel.value;

    this._motelService.onEdit(datos, this.idMongo).subscribe((data) => {
      this.visible = false;
      this.guardar = false;
      this.modificar = true;
      this.onList();
      this.submitType = 'Guardar';
      this.submitButton = 'btn btn-warning';
      this.formularioMotel.reset();



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

  onActivate(motel) {
    this._motelService.onDelete(motel._id, true).subscribe((data) => {
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








}
