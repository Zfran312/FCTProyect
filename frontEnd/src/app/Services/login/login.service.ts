import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/Models/login';
import { Constants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Httpheaders = new HttpHeaders({ 'Content-Type': 'application/json'});

  public static load;

  // Esta petición es para logearnos en el back y obtener los roles asociados para chequear los permisos.
  loginCredentials(login: Login): Observable<Login> {
    return this.http.post<Login>(`${Constants.API_URI + Constants.S_LOGIN}`, login, { headers: this.Httpheaders});
  }
  
  // Esta función comprueba si el usuario esta bloqueado o pendiente de activación 
  checkStatus(login: Login): Observable<Login> {
    return this.http.post<Login>(`${Constants.API_URI + Constants.LOGIN_USER_STATUS}`, login , { headers: this.Httpheaders });
  }

  // Controla los fallos al iniciar sesion y bloquea la cuenta si fallas 3 veces.
  addAttempt(login: Login): Observable<Login> {
    return this.http.post<Login>(`${Constants.API_URI + Constants.LOGIN_ATTEMPTS}`, login , { headers: this.Httpheaders });
  }
}
