import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Motel } from '../model/motel';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../model/usuario';


@Injectable({
    providedIn: 'root'
})


export class LoginService {

    public url = "http://localhost:3000/api"

    constructor(private _http: HttpClient) { }



    onConsult(usuario: LoginUsuario): Observable<any> {
        return this._http.post(`${this.url}/login`, usuario);
    }
}

    