import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../../Models/permission';
import { Role } from '../../Models/role';
import { HeadersService } from '../headers/headers.service';
import { Element } from '../../Models/element';
import { Constants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {
  role = Constants.ROLE_DEFAULT; permissions: Permission[];

  constructor(private http: HttpClient, private headersService: HeadersService) { }

  httpHeaders = this.headersService.getHeader();

  //Recuperas la lista de permisos 
  getPermission() {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_PERMISSIONS_LIST}`, { headers: this.httpHeaders });
  }

  //Recuperas la lista de elementos
  getElements() {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_PERMISSIONS_ELEMENTS}`, { headers: this.httpHeaders });
  }

  //Recupera los permisos segun la pantalla a la que accedas 
  elementsPermited(screen: String) {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_PERMISSIONS_FOR_SCREEN + screen}`, { headers: this.httpHeaders });
  }

  //Recupera los permios asociados aún rol 
  getPermissionByRole(role: Role) {
    return this.http.post(`${Constants.API_URI + Constants.ROUTE_PERMISSIONS_FOR_ROLES + role.idRole}`, role, { headers: this.httpHeaders });
  }

  //Añadir los elementos a la lista de permisos 
  addPermissions(element: Element[]) {
    return this.http.post(`${Constants.API_URI + Constants.ROUTE_PERMISSIONS_SAVE + this.role.idRole}`, element, { headers: this.httpHeaders });
  }

  //Actualizar los elementos de la lista de permisos que tienes 
  updatePermissions(permissions: Permission[]) {
    return this.http.put(`${Constants.API_URI + Constants.ROUTE_PERMISSIONS}`, permissions, { headers: this.httpHeaders });
  }

  //Cargar la variable rol.
  setRole(role: Role) {
    this.role = role;
  }

  //Recuperar los datos del rol.
  getRole() {
    return this.role;
  }
}