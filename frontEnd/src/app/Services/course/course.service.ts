import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/Models/course';
import { HeadersService } from '../headers/headers.service';
import { Constants } from '../../Constants/constants';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient, private headersService: HeadersService) { }

  //recupera las cabeceras del servicio de las mismas
  httpHeaders = this.headersService.getHeader();

  //Listado de cursos paginados
  getCoursesPage(page: number, paramOrder: string, orden: string): Observable<any> {
    return this.http.get(`${Constants.API_URI + Constants.S_COURSE_PAGE + page + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + orden}`, { headers: this.httpHeaders });
  }

  //Busca el curso que vamos a modificar
  getCourse(id: number) {
    return this.http.get(`${Constants.API_URI + Constants.ROUTE_COURSE + id}`, { headers: this.httpHeaders })
  }

  //Realiza la ordenacion por cualquiera de los campos que puede ver como parametros de entrada.
  filterbynestedPage(nameC: string, min: number, max: number, tematica: string, level: string, page: number, paramOrder: string, ordenado: string): Observable<any> {
    if (nameC == Constants.VACIO) { nameC = Constants.S_NULL; }
    if (min.toString() == Constants.VACIO) { min = Constants.CERO; }
    if (max.toString() == Constants.VACIO) { max = Constants.MAX_HORAS; }
    if (tematica == Constants.VACIO) { tematica = Constants.S_NULL; }
    if (level == Constants.VACIO) { level = Constants.S_NULL; }
    if (min >= max) {
      Swal.fire(Constants.T_ERROR_ALERTA,
        Constants.M_ERROR_FILTER_HORA,
        Constants.ERROR
      )
    } else {
      return this.http.get(`${Constants.API_URI + Constants.ROUTE_COURSE + Constants.ROUTE_FILTER_GENERAL + Constants.S_PAGE
        + Constants.ROUTE_BAR + page + Constants.ROUTE_BAR + nameC + Constants.ROUTE_BAR + min + Constants.ROUTE_BAR + max + Constants.ROUTE_BAR
        + tematica + Constants.ROUTE_BAR + level + Constants.ROUTE_BAR + paramOrder + Constants.ROUTE_BAR + ordenado}`, { headers: this.httpHeaders });
    }
  }

  //Crear el curso
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${Constants.API_URI + Constants.S_COURSE}`, course, { headers: this.httpHeaders });
  }

  //Borrado de curso y FTP relazionado
  deleteCourse(course: Course): Observable<Course> {
    /*Esto nos hace falta para pasarle el nombre del directorio que hay que borrar en el FTP*/
    var route = course.route.split(Constants.ROUTE_DIR_DOUBLEBAR)[Constants.DOS];
    return this.http.delete(`${Constants.API_URI + Constants.ROUTE_COURSE + course.idCourse + Constants.ROUTE_BAR + route}`);
  }
}

