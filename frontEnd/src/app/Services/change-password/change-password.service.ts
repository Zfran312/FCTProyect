import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/Models/login';
import { HeadersService } from '../headers/headers.service';
import { Constants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})

export class ChangePassService {
  constructor(private http: HttpClient, private headersService: HeadersService) { }

  //Recupera las cabeceras del servicio de las mismas
  httpHeaders = this.headersService.getHeader();

  //Crea el registro en la tabla de login con la relación a los usuarios y añadiendole el nuevo estado al usuario.
  addUser(loginUser: Login): Observable<Login> {
    return this.http.post<Login>(`${Constants.API_URI + Constants.SAVE_USERLOGIN}`, loginUser,{headers:this.httpHeaders});
  }

  //Guarda los datos del registro modificado.
  modify(loginUser: Login){
    return this.http.put<Login>(`${Constants.API_URI + Constants.MODIFY_USERLOGIN}`, loginUser,{headers:this.httpHeaders});
  }
}
