import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Descuento } from '../model/descuento';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DescuentoService {

    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem("token")
        })
      };

    public url = "http://localhost:3000/api"



    constructor(private _http: HttpClient) { }

    onSave(descuento: Descuento): Observable<any> {
        return this._http.post(`${this.url}/descuento`, descuento);
    }

    onEdit(descuento: Descuento, idDescuento) {
        return this._http.patch(`${this.url}/descuento/${idDescuento}`, descuento);
    }

    onList() : Observable<any> {
        return this._http.get(`${this.url}/descuento` );
    }

    onView(idDescuento): Observable<any> {
        return this._http.get(`${this.url}/descuento/${idDescuento}`);
    }

    onDelete(idDescuento, estadoDescuento) {
        return this._http.delete(`${this.url}/descuento/${idDescuento}/${estadoDescuento}`);
    }
}