import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { CourseService } from '../../Services/course/course.service';
import { Course } from 'src/app/Models/course';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Constants } from '../../Constants/constants';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { Permission } from 'src/app/Models/permission';
import { SkillService } from 'src/app/Services/skill/skill.service';
import { PermissionService } from 'src/app/Services/permission/permission.service';


@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.css']
})
export class FormCourseComponent implements OnInit {

  // VARIABLES NECESARIAS PARA EL DUAL LIST
  formato = Constants.FORMATO; data: any; confirmed = [];

  // CREACION DEL OBJETO COURSE
  course: Course = {
    nameCourse: Constants.VACIO, descC: Constants.VACIO, duration: Constants.CERO, topic: Constants.VACIO, level: Constants.NIVEL_BAJO,
    published: false, preview: Constants.VACIO, route: Constants.VACIO
  };

  // VARIABLES NECESARIA PARA SABER SI ESTAS CREANDO O EDITANDO
   isUpdating;

  // HTML
  lNombre = Constants.L_NOMBRE; lDesc = Constants.L_DESCRIPCION; lhoras = Constants.L_HORAS; lTematica = Constants.L_TEMATICA;
  lNivel = Constants.L_NIVEL; nivelB = Constants.NIVEL_BAJO; nivelM = Constants.NIVEL_MEDIO; nivelA = Constants.NIVEL_ALTO;
  lPublicado = Constants.L_PUBLICADO; publicadoTrue = Constants.S_SI; publicadoFalse = Constants.S_NO; lFtp = Constants.L_FTP;
  lSkill = Constants.L_SKILL; btnVolver = Constants.BTN_VOLVER; titulo = Constants.T_CREACION_CURSO;

  // VALIDACIONES
  valRequired = Constants.M_VAL_REQUIRED; valTematicaPattern = Constants.M_VAL_TEMATICA_CURSO_PATTERN;
  valHorasCurso = Constants.M_VAL_HORAS_CURSO_PATTERN;

  // CONSTRUCTOR
  constructor(private navbarService: NavbarService, private courseService: CourseService, private router: Router,
              private activatedRoute: ActivatedRoute, private loginService: LoginService, private permissionService: PermissionService,
              private authmanagerService: AuthmanagerService, private skillService: SkillService) { }

  permited: Permission[];
  
  editBtn: boolean = false;
  createBtn: boolean = false;
  access: boolean = false;
  canUse: boolean = true;

  // VALIDACION DE QUE SE SELECCIONE AL MENOS UNA HABILIDAD
  valDualList(): boolean {
    if (this.confirmed.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // RECUPERACION DE LAS SKILLS PARA CARGARLAS EN EL DUAL LIST
  response() {
    this.skillService.getSkills().subscribe(
      res => {
        this.data = res;
        this.cargarModificacion();
      },
      err => console.log(Constants.LOG_FALLO)
    );
  }

  // AL EDITAR CARGAR LOS DATOS DEL CURSO EN SUS RESPECTIVOS INPUTS PARA PODER EDITARLOS
  cargarModificacion() {
    const params = this.activatedRoute.snapshot.params;
      if (params.id) {
        this.courseService.getCourse(params.id).subscribe(
          res => {
            this.course = res;
            this.course.route = this.course.route.split(Constants.ROUTE_DIR_DOUBLEBAR)[3];
            this.confirmed = this.course.skills;
            this.titulo = Constants.T_EDICION_CURSO;
            this.isUpdating = true;
          },
          err => {
            Swal.fire(Constants.M_ERROR_CARGA_UPDATE_P1, Constants.M_ERROR_CARGA_UPDATE_P2, Constants.ERROR);
            console.error(err);
          }
        );
      }
      this.elementsPermited();
  }

  // METODO DE GUARDAR NUEVO CURSO
  saveNewCourse() {
    if (this.valDualList()) {
      this.course.skills = this.confirmed;
      this.courseService.createCourse(this.course).subscribe(
        res => {
          this.router.navigate([Constants.REDIREC_LIST_CURSO + '0']);
        }
      );
    } else {
      this.ngOnInit();
      Swal.fire(
        Constants.T_ERROR_ALERTA,
        Constants.M_ERROR_COURSE_P2,
        Constants.WARNNING);
    }
  }

  // VOLVER A PÁGINA ANTERIOR
  volver() {
    this.navbarService.returnBack();
  }

  elementsPermited(){
    this.permissionService.elementsPermited("Course").subscribe(
      res =>{
        this.permited = res as Permission[];
        this.checkPermission();
      },
      err =>{
        console.log(err);
      }
    );
  }

  checkPermission(){
    for(var p = 0; p<this.permited.length; p++){
      if(this.permited[p].id.element.identifier.includes("Edit")) {
        this.editBtn = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("Create")) {
        this.createBtn = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("lblCourses")) {
        this.access = this.permited[p].permited;
      }
    }
    this.permitedEditCreate();
  }
  
  permitedEditCreate(){
    if(this.isUpdating){
      if(!this.editBtn||!this.access){
        this.canUse = false;
      }
    }else{
      if(!this.createBtn||!this.access){
        this.canUse = false;
      }
    }
  }

  // ngOnInit SE EJECUTA CADA VEZ QUE SE CARGA EL COMPONENTE
  ngOnInit() {
    this.authmanagerService.checkAuth();
    this.navbarService.show();
    this.titulo = Constants.T_CREACION_CURSO;
    this.response();
    this.course.level = Constants.NIVEL_DEFECTO_CURSO;
    this.course.published = true;
  }
}
