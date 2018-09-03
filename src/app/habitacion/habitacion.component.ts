import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Habitacion } from '../model/habitacion';
import { HabitacionService } from '../service/habitacion.service';



 @Component({
 selector: 'app-habitacion',
 templateUrl: './habitacion.component.html',
 styleUrls: ['./habitacion.component.scss']

 })

 export class HabitacionComponent implements OnInit {
  
  visible = false;
  guardar = true;
  modificar = false;
  submitType: string = 'Guardar';
  selectedRow: number;
  submitButton : string = "btn btn-warning"


  
  habitacionModel: Habitacion = {
      numeroHabitacion: '',
      tipoHabitacion: '',
      servicioHabitacion: '',
      precioHabitacion: '',
      estadoHabitacion: true
}


    habitaciones : Array<Habitacion> = [];

  constructor(private _habitacionService : HabitacionService) { }

  ngOnInit() {

    this.onList();
  }
    onNew() {
      this.visible = true;
      this.submitType = 'Guardar';
      this.submitButton = 'btn btn-warning'

    }

    onList(){
        this._habitacionService.onList().subscribe((data)=>{
          this.habitaciones = data.datos;
          
      }, err =>{
  
      });
    }

    onSave() {
      this._habitacionService.onSave(this.habitacionModel).subscribe((data) => {
        if (!data.ok){
            alert("Hubo un error al guardar.  ");
        } else{
            alert("Se guardo correctamente.");
            this.onList();

            this.habitacionModel = {
              tipoHabitacion: '',
              numeroHabitacion: '',
              servicioHabitacion: '',
              precioHabitacion: '',
              estadoHabitacion: true
        }
      }
      }, err => {
          alert(err);
          console.log("object");
      })

      this.visible = false;
    }

    onCancel(){
      this.visible = false;
      this.submitButton = 'btn btn-warning'

    }

    onDelete(index: number) {
      // Delete the corresponding registration entry from the list.
      this.habitaciones.splice(index,1);
    }


    onEdit(){
      this.visible = true;
      this.submitType = 'Confirmar Cambios';
      this.submitButton = 'btn btn-danger';
    
    }

    }
