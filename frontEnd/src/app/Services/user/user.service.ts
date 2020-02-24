import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { HeadersService } from '../headers/headers.service';
import { Constants } from '../../Constants/constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private headersService: HeadersService) { }

  //Recupera las cabeceras
  httpHeaders = this.headersService.getHeader();

  //Recuperar todos los usuarios de la BBDD
  getUsers() {
    return this.http.get(`${Constants.API_URI + Constants.S_USER}`, { headers: this.httpHeaders });
  }

  //Recuperar la lista de usarios con filtros
  getUserPage(page: number, paramOrder: string, orden): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.S_USER_PAGE + page + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + orden}`, { headers: this.httpHeaders });
  }

  //Recupera un usuario por su nombre 
  getUser(id: number) {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_USER + id}`, { headers: this.httpHeaders });
  }

  //Comprueba si el DAS es valido
  returnValidDas(dasId: string): Observable<User> {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_USER + Constants.ROUTE_VALID_DAS + dasId}`, { headers: this.httpHeaders });
  }

  //Recupera un usuario por DAS_ID
  filterByDasId(dasId: string) {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_USER + Constants.ROUTE_FILTER_USER_DAS + dasId}`, { headers: this.httpHeaders });
  }

  //Recupera la lista de usarios aplicando los filtros indicados.
  filterNestedPage(user: User, page: Number, paramOrder: string, ordenado: string): Observable<any> {
    var das = Constants.S_NULL; var name = Constants.S_NULL; var lastname1 = Constants.S_NULL; var lastname2 = Constants.S_NULL;
    if (user.dasId == Constants.VACIO) { das = Constants.S_NULL; } else { das = user.dasId; }
    if (user.nameUser == Constants.VACIO) { name = Constants.S_NULL; } else { name = user.nameUser; }
    if (user.lastname1 == Constants.VACIO) { lastname1 = Constants.S_NULL; } else { lastname1 = user.lastname1; }
    if (user.lastname2 == Constants.VACIO) { lastname2 = Constants.S_NULL; } else { lastname2 = user.lastname2; }
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_USER + Constants.ROUTE_FILTER_GENERAL + Constants.S_PAGE + Constants.ROUTE_BAR + page + Constants.ROUTE_BAR + das + Constants.ROUTE_BAR + name
      + Constants.ROUTE_BAR + lastname1 + Constants.ROUTE_BAR + lastname2 + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + ordenado}`, { headers: this.httpHeaders });
  }

  //Añade un nuevo usuario.
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${Constants.API_URI + Constants.S_USER}`, user, { headers: this.httpHeaders });
  }

  //Añade varios usuarios a la vez, esto es necesario para los roles cuando asignamos el rol a varios usuarios.
  addUsers(user: User[]): Observable<User> {
    return this.http.post<User>(`${Constants.API_URI + Constants.S_USERLIST}`, user, { headers: this.httpHeaders });
  }

  //Modifica un usuario.
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put(`${Constants.API_URI + Constants.ROUTE_USER + id}`, user, { headers: this.httpHeaders });
  }

  //Elimina un usuario.
  deleteUser(id: number): Observable<User> {
    return this.http.delete(`${Constants.API_URI + Constants.ROUTE_USER + id}`, { headers: this.httpHeaders });
  }
}
