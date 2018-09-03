import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../model/reserva';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem("token")
        })
      };
      
    public url = "http://localhost:3000/api"



    constructor(private _http: HttpClient) { }

   
}