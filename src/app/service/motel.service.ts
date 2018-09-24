import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Motel } from '../model/motel';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MotelService {

    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem("token")
        })
      };

    public url = "http://localhost:3000/api"



    constructor(private _http: HttpClient) { }

    onSave(motel: Motel): Observable<any> {
        return this._http.post(`${this.url}/motel`, motel);
    }

    onEdit(motel: Motel, nitMotel):  Observable<any> {
        return this._http.put(`${this.url}/motel/${nitMotel}`, motel);
    }

    onList() : Observable<any> {
        return this._http.get(`${this.url}/motel` );
    }

    onListInactivo() : Observable<any> {
        return this._http.get(`${this.url}/motelInactivo` );
    }

    onView(nitMotel): Observable<any> {
        return this._http.get(`${this.url}/motel/${nitMotel}`);
    }

    onDelete(nitMotel, estadoMotel): Observable<any> {
        return this._http.delete(`${this.url}/motel/${nitMotel}/${estadoMotel}`);
    }
}