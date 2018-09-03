import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('token')
        })
      };

    public url = "http://localhost:3000/api"



    constructor(private _http: HttpClient) { }

    onSave(usuario: Usuario): Observable<any> {
        return this._http.post(`${this.url}/usuario`, usuario, this.httpOptions);
    }

    onEdit(usuario: Usuario, idUsuario):  Observable<any> {
        return this._http.put(`${this.url}/usuario/${idUsuario}`, usuario, this.httpOptions);
    }

    onListInactivo() : Observable<any> {
        return this._http.get(`${this.url}/usuarioInactivo`, this.httpOptions);
    }


    onList() : Observable<any> {
        return this._http.get(`${this.url}/usuario`, this.httpOptions);
    }

    onView(idUsuario): Observable<any> {
        return this._http.get(`${this.url}/usuario/${idUsuario}`, this.httpOptions);
    }

    onDelete(idUsuario, estadoUsuario): Observable<any> {
       return this._http.delete(`${this.url}/usuario/${idUsuario}/${estadoUsuario}`, this.httpOptions);
    }

}
