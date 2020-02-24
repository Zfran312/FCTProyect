import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Constants } from '../../Constants/constants'

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor() { }

  private header: HttpHeaders

  //Este metodo se encargar de recuperar el usuario y la contraseña de las variables de sesion  y pasarlas 
  //al resto de componentes/servicios de la aplicacion para realizar las peticiones 
  public getHeader(): HttpHeaders {
    let username = sessionStorage.getItem(Constants.S_USERNAME);
    if (username != null) {
      let pass = atob(sessionStorage.getItem(Constants.S_PASSWORD));
      this.header = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(username + ':' + pass) });
    } else {
      this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return this.header;
  }
}
