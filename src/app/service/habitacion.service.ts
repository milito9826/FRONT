import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Habitacion } from '../model/habitacion';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HabitacionService {

    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem("token")
        })
      };
    public url = "http://localhost:3000/api"



    constructor(private _http: HttpClient) { }

    onSave(habitacion: Habitacion): Observable<any> {
        return this._http.post(`${this.url}/habitacion`, habitacion);
    }

    onEdit(habitacion: Habitacion, idHabitacion) {
        return this._http.patch(`${this.url}/habitacion/${idHabitacion}`, habitacion);
    }

    onList() : Observable<any> {
        return this._http.get(`${this.url}/habitacion` );
    }

    onListInactivo() : Observable<any> {
        return this._http.get(`${this.url}/habitacionInactivo` );
    }

    onView(idHabitacion): Observable<any> {
        return this._http.get(`${this.url}/habitacion/${idHabitacion}`);
    }

    onDelete(idHabitacion, estadoHabitacion) {
        return this._http.delete(`${this.url}/habitacion/${idHabitacion}/${estadoHabitacion}`);
    }
}