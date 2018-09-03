import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem("token")
        })
      };

    public url = "http://localhost:3000/api"

    }