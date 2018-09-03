import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Descuento } from '../model/descuento';
import { DescuentoService } from '../service/descuento.service';



 @Component({
 selector: 'app-descuento',
 templateUrl: './descuento.component.html',
 styleUrls: ['./descuento.component.scss'],
 changeDetection: ChangeDetectionStrategy.OnPush

 })

 export class DescuentoComponent implements OnInit {

  public dateTime:  Date;

  visible = false;
  guardar = true;
  modificar = false;
  submitType: string = 'Guardar';
  selectedRow: number;
  submitButton : string = "btn btn-warning"

  
  descuentoModel: Descuento = {
    idDescuento: '',
    tipoDescuento: '',
    fechaInicioDescuento: new Date,
    fechaFinalDescuento: new Date,
    porcentajeDescuento: '',
    estadoDescuento: true
}


    descuentos : Array<Descuento> = [];

  constructor(private _descuentoService : DescuentoService) { }

  ngOnInit() {

    this.onList();
  }
    onNew() {
      this.visible = true;
      this.submitType = 'Guardar';
      this.submitButton = 'btn btn-warning'

    }

    onList(){
        this._descuentoService.onList().subscribe((data)=>{
          this.descuentos = data.datos;
          
      }, err =>{
  
      });
    }

    onSave() {
      this._descuentoService.onSave(this.descuentoModel).subscribe((data) => {
        if (!data.ok){
            alert("Hubo un error al guardar.  ");
        } else{
            alert("Se guardo correctamente.");
            this.onList();

            this.descuentoModel = {
              idDescuento: '',
              tipoDescuento: '',
              fechaInicioDescuento: new Date,
              fechaFinalDescuento: new Date,
              porcentajeDescuento: '',
              estadoDescuento: true
        }
      }
      }, err => {
          alert(err);
          
      })

      this.visible = false;
    }

    onCancel(){
      this.visible = false;
      this.submitButton = 'btn btn-warning'

    }

    onDelete(index: number) {
      // Delete the corresponding registration entry from the list.
      this.descuentos.splice(index,1);
    }


    onEdit(){
      this.visible = true;
      this.submitType = 'Confirmar Cambios';
      this.submitButton = 'btn btn-danger';
    
    }

    }
