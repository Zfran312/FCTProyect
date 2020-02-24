import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../../Models/skill';
import { HeadersService } from '../headers/headers.service';
import { Constants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})

export class SkillService {

  constructor(private http: HttpClient, private headersService: HeadersService) { }

  //Recuperar las cabeceras 
  httpHeaders = this.headersService.getHeader();

  //Recupèrar las Skill
  getSkills() {
    return this.http.get(`${Constants.API_URI + Constants.S_SKILL}` , { headers: this.httpHeaders });
  }

  //Recuperar las Skills con filtros
  getSkillsPage(page: number, paramOrder:string, orden:string): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.S_SKILL_PAGE + page + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + orden}`, { headers: this.httpHeaders });
  }

  //Recuperar una unica Skill
  getSkill(id: number) {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_SKILL + id}`, { headers: this.httpHeaders } );
  }

  //Recuperar las Skills con filtros
  filterBySkillNamePage(name: string, page: number, paramOrder:string, orden:string): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_SKILL + Constants.ROUTE_FILTER_SKILL_NAME + Constants.S_PAGE + Constants.ROUTE_BAR
      + page + Constants.ROUTE_BAR + name + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + orden}`, { headers: this.httpHeaders });
  }

  //Añadir una nueva Skill
  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${Constants.API_URI + Constants.S_SKILL}`, skill, { headers: this.httpHeaders });
  }

  //Actualizar una Skill
  updateSkill(id: string | number, updatedSkill: Skill): Observable<Skill> {
    return this.http.put(`${Constants.API_URI + Constants.ROUTE_SKILL + id}`, updatedSkill, { headers: this.httpHeaders });
  }

  //Eliminar una Skill
  delete(id: number): Observable<Skill> {
    return this.http.delete(`${Constants.API_URI + Constants.ROUTE_SKILL + id}` , { headers: this.httpHeaders });
  }
}
