import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../Services/course/course.service';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { Course } from '../../Models/course';
import Swal from 'sweetalert2';
import { Skill } from 'src/app/Models/skill';
import { Constants } from '../../Constants/constants';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { Permission } from 'src/app/Models/permission';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/Services/permission/permission.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  // VARIABLES NECESARIAS PARA EL PAGINADOR Y ORDENACION
  page = Constants.CERO;
  pageSize = Constants.PAGESIZE;
  paginator: any; ordenBoolean = false; campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_COURSE; orden = Constants.S_ASC; habilitarFiltro = false;

  // CONSTUCTOR
  constructor(private navbarService: NavbarService, private courseService: CourseService, private loginService: LoginService,
    private activatedRoute: ActivatedRoute, private router: Router, private authmanagerService: AuthmanagerService,
    private permissionService: PermissionService) { }

  // CREACION DEL OBJETO COURSE
  course: Course = {
    nameCourse: Constants.VACIO, descC: Constants.VACIO, duration: Constants.CERO,
    topic: Constants.VACIO, level: Constants.VACIO, published: false, preview: Constants.VACIO,
    route: Constants.VACIO
  };

  // CREACION DE LA LISTA DE CURSOS
  courses: any = [];

  // BOOLEAN PARA MOSTRAR EL DESPLEGABLE DE LOS FILTROS
  habilitar: boolean = false;

  // VARIABLES NECESARIAS DEL HTML
  titulo = Constants.T_LISTAR_CURSOS; btnCrear = Constants.BTN_CREAR_CURSO; btnFiltro = Constants.BTN_FILTRO_CURSO; btnBuscar = Constants.BTN_BUSCAR;
  btnReset = Constants.BTN_RESET_FILTRO; lNombreCurso = Constants.L_NOMBRE_CURSO; cNombre = Constants.COL_NOMBRE; cNHoras = Constants.COL_NHORAS;
  cTematica = Constants.COL_TEMATICA; cNivel = Constants.COL_NIVEL; cPublicado = Constants.COL_PUBLICADO; cDescrip = Constants.COL_DESCRIP;
  cSkill = Constants.COL_SKILL; cFTP = Constants.COL_FTP; cEdit = Constants.COL_EDIT; cEliminar = Constants.COL_ELIMINAR; btnEliminar = Constants.BTN_ELIM;

  permited: Permission[];

  editBtn: boolean = false;
  createBtn: boolean = false;
  deleteBtn: boolean = false;
  access: boolean = true;
  visible: boolean = false;
  resetFilter: boolean = false;

  btnEdit = Constants.BTN_EDITAR; btnDescarga = Constants.BTN_DESCAR_CURSO; btnVer = Constants.BTN_VER_CURSO; lTematica = Constants.L_TEMATICA;
  patternTematica = Constants.M_VAL_TEMATICA_CURSO_PATTERN; lhoras = Constants.L_HORAS; patternHoras = Constants.M_VAL_HORAS_CURSO_PATTERN;
  lNivel = Constants.L_NIVEL; nivelB = Constants.NIVEL_BAJO; nivelM = Constants.NIVEL_MEDIO; nivelA = Constants.NIVEL_ALTO;
  lHoraMin = Constants.L_MIN_HORAS; lHoraMax = Constants.L_MAX_HORAS;

  // FILTROS ANIDADOS
  horaMin = Constants.NULL; horaMax = Constants.NULL; tematica = Constants.VACIO; name = Constants.VACIO; level = Constants.VACIO;

  // Nivel
  alto = Constants.NIVEL_ALTO; medio = Constants.NIVEL_MEDIO; bajo = Constants.NIVEL_BAJO;

  reset(opcion) {
    if (this.ordenBoolean) {
      this.orden = Constants.S_ASC;
      this.ordenBoolean = false;
    } else {
      this.ordenBoolean = true;
      this.orden = Constants.S_DESC;
    }
    this.page = Constants.CERO;
    this.campoOrdenar = opcion;
    this.router.navigate([Constants.REDIREC_LIST_CURSO + this.page]);
    this.response();
  }

  // METODO PARA CARGAR TODOS LOS CURSOS, POR PÁGINA
  response() {
    if (this.habilitarFiltro == false) {
      this.courseService.getCoursesPage(this.page, this.campoOrdenar, this.orden).subscribe(
        res => {
          this.courses = res.content as Course[];
          this.paginator = res;
          this.elementsPermited();
        },
        err => console.log(Constants.LOG_FALLO)
      );
    } else {
      this.filterbyNested();
    }
  }

  // MÉTODO DEL FILTRO ANIDADO
  filterbyNested() {
    if (!this.habilitarFiltro) {
      this.page = Constants.CERO;
      this.router.navigate([Constants.REDIREC_LIST_CURSO + this.page])
    }
    if (!this.resetFilter) {
      this.campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_COURSE;
      this.orden = Constants.S_ASC;
    }
    this.resetFilter = true;
    this.habilitar = false;
    this.habilitarFiltro = true;
    this.courseService.filterbynestedPage(this.name, this.horaMin, this.horaMax, this.tematica, this.level, this.page, this.campoOrdenar, this.orden).subscribe(
      res => {
        this.courses = res.content as Course[]
        this.paginator = res
      },
      err => {
        Swal.fire(Constants.T_ERROR_ALERTA, Constants.M_ERROR_FILTRO_ANIDADO, Constants.ERROR),
          console.log(err);
      }
    );
  }

  donation() {
    Swal.fire({
      title: Constants.T_DONACION,
      html: Constants.HTML_DONACION,
      confirmButtonText: Constants.BTN_VOLVER,
      confirmButtonColor: 'red',
    });
  }

  // METODO PARA MOSTRAR LAS SKILLS EN EL FRONT MEDIANTE EL BOTON VER SKILLS
  verSkills(listSkills: Skill[]) {
    var element = Constants.VACIO;
    for (let index = Constants.CERO; index < listSkills.length; index++) {
      element += Constants.SALTO_LINEA + listSkills[index].name;
    }
    Swal.fire(Constants.M_LISTA_SKILLS + element);
  }

  // METODO PARA MOSTRAR LA DESCRIPCION EN EL FRONT MEDIANTE EL BOTON VER DESCRIPCION
  verDesc(desc: string) {
    Swal.fire({
      icon: Constants.INFO,
      title: Constants.VERDESC_P2,
      text: desc
    });
  }

  // METODO PARA MOSTRAR EL DESPLEGABLE DE LOS FILTROS
  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }

  // ELIMINAR CURSO
  delete(course: Course): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: Constants.BTN_ST_SUCCESS,
        cancelButton: Constants.BTN_ST_DANGER
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿ Seguro que desea eliminar el curso ${course.nameCourse}?`,
      icon: Constants.WARNNING,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteCourse(course).subscribe(
          response => {
            this.courses = this.courses.filter(cli => cli !== course);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Curso ${course.nameCourse} eliminado con éxito.`,
              Constants.SUCCESS
            );
            this.response();
          }
        );
      }
    });
  }

  // RESETEAR CAMPOS DE LOS FILTROS
  cleanFilter() {
    this.horaMin = Constants.VACIO;
    this.horaMax = Constants.VACIO;
    this.tematica = Constants.VACIO;
    this.name = Constants.VACIO;
    this.level = Constants.VACIO;
    this.habilitarFiltro = false;
    this.page = Constants.CERO;
    this.orden = Constants.S_ASC;
    this.ordenBoolean = false;
    this.campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_COURSE;
    this.resetFilter = false;
    this.habilitar = false;
    this.router.navigate([Constants.REDIREC_LIST_CURSO + this.page])
    this.response();
  }


  elementsPermited() {
    this.permissionService.elementsPermited("Course").subscribe(
      res => {
        this.permited = res as Permission[];
        this.checkPermission();
        this.visible = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  checkPermission() {
    for (var p = Constants.CERO; p < this.permited.length; p++) {
      if (this.permited[p].id.element.identifier.includes("Edit")) {
        this.editBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Delete")) {
        this.deleteBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Create")) {
        this.createBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("lbl")) {
        this.access = this.permited[p].permited;
      }
    }
  }

  // ngOnInit SE EJECUTA CADA VEZ QUE SE CARGA EL COMPONENTE
  ngOnInit() {
    this.authmanagerService.checkAuth();
    this.cleanFilter();
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.page = +params.get(Constants.S_PAGE);
        if (!this.page) {
          this.page = Constants.CERO;
        }
        this.navbarService.show();
        this.response();
      }
    );
  }
}
