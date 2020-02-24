import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../Models/role';
import { Observable } from 'rxjs';
import { HeadersService } from '../headers/headers.service';
import { Constants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient, private headersService: HeadersService) { }

  httpHeaders = this.headersService.getHeader();

  //Recupera los roles existentes en BBDD
  getRoles(): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.S_ROLES}`, { headers: this.httpHeaders });
  }

  //Recupera los roles existentes en BBDD con los filtros que puedes ver 
  getRolesPage(page: number, paramOrder: string, orden: string): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.S_ROLE_PAGE + page + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + orden}`, { headers: this.httpHeaders });
  }

  //Recupera un unico rol especifico por el ID
  getRole(id: number) {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_ROL + id}`, { headers: this.httpHeaders });
  }

  //Recupera los usarios asignados a un rol.
  getListUsersRole(id: number): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_ROL + Constants.ROUTE_ROL_LIST_USER + id}`, { headers: this.httpHeaders });
  }

  //Recupera los roles existentes en BBDD con los filtros que puedes ver 
  filterByRoleNamePage(name: string, page: number, paramOrder: string, orden: string): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_ROL + Constants.ROUTE_FILTER_ROLE_NAME + Constants.S_PAGE + Constants.ROUTE_BAR
      + page + Constants.ROUTE_BAR + name + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + orden}`, { headers: this.httpHeaders });
  }

  //Recupera el numero de usuarios asociados aun rol.
  getListUsersByRole(id: number) {
    return this.http.get(`${Constants.API_URI +  Constants.ROUTE_ROL + Constants.ROUTE_LIST_USER_BY_ROLE + id}`, { headers: this.httpHeaders });
  }

  //Añadir un nuevo rol.
  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${Constants.API_URI + Constants.ROUTE_ROL}`, role, { headers: this.httpHeaders });
  }

  //Modificar un rol.
  updateRole(id: string | number, updatedRole: Role): Observable<Role> {
    return this.http.put(`${Constants.API_URI + Constants.ROUTE_ROL + id}`, updatedRole, { headers: this.httpHeaders });
  }

  //Eliminar un rol.
  delete(id: number): Observable<Role> {
    return this.http.delete(`${Constants.API_URI + Constants.ROUTE_ROL + id}`, { headers: this.httpHeaders });
  }
}
