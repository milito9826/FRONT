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

    onEdit(habitacion: Habitacion, _id):  Observable<any> {
        return this._http.put(`${this.url}/habitacion/${_id}`, habitacion);
    }

    onList() : Observable<any> {
        return this._http.get(`${this.url}/habitacion` );
    }

    onListInactivo() : Observable<any> {
        return this._http.get(`${this.url}/habitacionInactivo` );
    }

    onView(_id): Observable<any> {
        return this._http.get(`${this.url}/habitacion/${_id}`);
    }

    onDelete(_id, estadoHabitacion): Observable<any> {
        return this._http.delete(`${this.url}/habitacion/${_id}/${estadoHabitacion}`);
    }
}